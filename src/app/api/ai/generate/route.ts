import { envConfigs } from '@/config';
import { AIMediaType } from '@/extensions/ai';
import { calculateCredits } from '@/extensions/ai/credit-calculator';
import { getUuid } from '@/shared/lib/hash';
import { respData, respErr } from '@/shared/lib/resp';
import { createAITask, NewAITask } from '@/shared/models/ai_task';
import { getRemainingCredits } from '@/shared/models/credit';
import { getUserInfo } from '@/shared/models/user';
import { acquireProvider, getKeyPool } from '@/shared/services/ai';

export async function POST(request: Request) {
  try {
    const {
      provider,
      mediaType,
      model,
      prompt,
      options,
      scene,
      // Credit calc params from frontend
      quantity,
      resolution,
      duration,
      quality,
      nFrames,
    } = await request.json();

    if (!provider || !mediaType || !model) {
      throw new Error('invalid params');
    }
    if (!prompt && !options) {
      throw new Error('prompt or options is required');
    }

    // 1. Auth
    const user = await getUserInfo();
    if (!user) {
      throw new Error('no auth, please sign in');
    }

    // 2. Calculate credits (server-side, never trust client)
    const costCredits = calculateCredits({
      mediaType,
      modelId: model,
      quantity: quantity || 1,
      resolution,
      duration,
      quality,
      nFrames,
    });

    // 3. Check balance
    const remainingCredits = await getRemainingCredits(user.id);
    if (remainingCredits < costCredits) {
      throw new Error('insufficient credits');
    }

    // 4. Acquire provider from key pool (load balanced)
    const { provider: aiProvider, slot } = await acquireProvider(provider);

    const callbackUrl = `${envConfigs.app_url}/api/ai/notify/${provider}`;

    try {
      // 5. Generate
      const params: any = {
        mediaType,
        model,
        prompt,
        callbackUrl,
        options,
      };

      const result = await aiProvider.generate({ params });
      if (!result?.taskId) {
        throw new Error('ai generate failed: no taskId');
      }

      // 6. Success: report to pool
      const pool = getKeyPool(provider);
      pool?.onSuccess(slot);

      // 7. Create task record (createAITask handles credit consumption in transaction)
      const newAITask: NewAITask = {
        id: getUuid(),
        userId: user.id,
        mediaType,
        provider,
        model,
        prompt: prompt || '',
        scene: scene || `${mediaType}-generation`,
        options: options ? JSON.stringify(options) : null,
        status: result.taskStatus,
        costCredits,
        taskId: result.taskId,
        taskInfo: result.taskInfo ? JSON.stringify(result.taskInfo) : null,
        taskResult: result.taskResult ? JSON.stringify(result.taskResult) : null,
      };
      await createAITask(newAITask);

      return respData(newAITask);
    } catch (error: any) {
      // Report error to pool for cooldown/circuit-breaking
      const pool = getKeyPool(provider);
      pool?.onError(slot, error);
      throw error;
    }
  } catch (e: any) {
    console.log('generate failed', e);
    return respErr(e.message);
  }
}
