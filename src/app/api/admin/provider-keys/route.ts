import { db } from '@/core/db';
import { providerKey } from '@/config/db/schema';
import { PERMISSIONS } from '@/core/rbac';
import { getUuid } from '@/shared/lib/hash';
import { respData, respErr } from '@/shared/lib/resp';
import { getUserInfo } from '@/shared/models/user';
import { hasPermission } from '@/shared/services/rbac';
import { resetKeyPools } from '@/shared/services/ai';

export async function GET(req: Request) {
  try {
    const user = await getUserInfo(req.headers);
    if (!user || !(await hasPermission(user.id, PERMISSIONS.ADMIN_ACCESS))) {
      return respErr('no permission');
    }
    const keys = await db().select().from(providerKey).orderBy(providerKey.provider, providerKey.priority);
    // Mask API keys
    const masked = keys.map((k: any) => ({
      ...k,
      apiKey: k.apiKey.slice(0, 6) + '...' + k.apiKey.slice(-4),
    }));
    return respData(masked);
  } catch (e: any) {
    return respErr(e.message);
  }
}

export async function POST(req: Request) {
  try {
    const user = await getUserInfo(req.headers);
    if (!user || !(await hasPermission(user.id, PERMISSIONS.ADMIN_ACCESS))) {
      return respErr('no permission');
    }
    const { provider, apiKey, label, rpmLimit, dailyLimit, priority } = await req.json();
    if (!provider || !apiKey) return respErr('provider and apiKey required');

    const newKey = {
      id: getUuid(),
      provider,
      apiKey,
      label: label || '',
      rpmLimit: rpmLimit || 10,
      dailyLimit: dailyLimit || 0,
      priority: priority || 0,
      status: 'active',
    };
    await db().insert(providerKey).values(newKey);

    // Refresh in-memory pools
    resetKeyPools();

    return respData({ id: newKey.id });
  } catch (e: any) {
    return respErr(e.message);
  }
}
