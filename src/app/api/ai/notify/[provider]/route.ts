import { eq } from 'drizzle-orm';
import { db } from '@/core/db';
import { aiTask } from '@/config/db/schema';
import { respData, respErr } from '@/shared/lib/resp';
import { updateAITaskById } from '@/shared/models/ai_task';
import { AITaskStatus } from '@/extensions/ai/types';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ provider: string }> }
) {
  try {
    const { provider } = await params;
    const body = await req.json();

    // Kie.ai callback format: { taskId, state, resultJson, failCode, failMsg }
    const { taskId, state, resultJson, failCode, failMsg } = body;

    if (!taskId) {
      return respErr('taskId is required');
    }

    // Find task by provider taskId
    const [task] = await db()
      .select()
      .from(aiTask)
      .where(eq(aiTask.taskId, taskId))
      .limit(1);

    if (!task) {
      console.log(`AI notify: task not found for taskId=${taskId}`);
      return Response.json({ message: 'ok' });
    }

    // Map status
    let status: string;
    switch (state) {
      case 'success': status = AITaskStatus.SUCCESS; break;
      case 'fail': status = AITaskStatus.FAILED; break;
      case 'generating': status = AITaskStatus.PROCESSING; break;
      default: status = AITaskStatus.PENDING;
    }

    // Parse result
    let taskResult = body;
    let images: any[] = [];
    let videos: any[] = [];

    if (resultJson) {
      try {
        const parsed = typeof resultJson === 'string' ? JSON.parse(resultJson) : resultJson;
        if (parsed.resultUrls) {
          if (task.mediaType === 'image') {
            images = parsed.resultUrls.map((url: string) => ({ imageUrl: url }));
          } else if (task.mediaType === 'video') {
            videos = parsed.resultUrls.map((url: string) => ({ videoUrl: url }));
          }
        }
      } catch (e) { /* ignore parse error */ }
    }

    // Update task
    await updateAITaskById(task.id, {
      status,
      taskInfo: JSON.stringify({
        images: images.length > 0 ? images : undefined,
        videos: videos.length > 0 ? videos : undefined,
        status: state,
        errorCode: failCode,
        errorMessage: failMsg,
      }),
      taskResult: JSON.stringify(taskResult),
    });

    // If task failed, refund credits
    if (status === AITaskStatus.FAILED && task.creditId) {
      // TODO: implement credit refund
      console.log(`Task ${taskId} failed, should refund ${task.costCredits} credits to user ${task.userId}`);
    }

    // If success and user chose public, add to gallery
    // (check options for isPublic flag)
    if (status === AITaskStatus.SUCCESS) {
      try {
        const options = task.options ? JSON.parse(task.options) : {};
        if (options.isPublic !== false) {
          const urls = images.map(i => i.imageUrl).concat(videos.map(v => v.videoUrl));
          if (urls.length > 0) {
            // Insert into gallery (fire-and-forget)
            const { getUuid } = await import('@/shared/lib/hash');
            const gallerySchema = (await import('@/config/db/schema')).gallery;
            for (const url of urls) {
              await db().insert(gallerySchema).values({
                id: getUuid(),
                userId: task.userId,
                taskId: task.id,
                mediaType: task.mediaType,
                model: task.model,
                prompt: task.prompt,
                mediaUrl: url,
                isPublic: true,
                status: 'active',
              });
            }
          }
        }
      } catch (e) { console.error('gallery insert error', e); }
    }

    return Response.json({ message: 'ok' });
  } catch (e: any) {
    console.error('ai notify error', e);
    return Response.json({ message: 'error', error: e.message }, { status: 500 });
  }
}
