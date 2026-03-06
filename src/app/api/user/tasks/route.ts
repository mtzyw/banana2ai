import { and, desc, eq } from 'drizzle-orm';
import { db } from '@/core/db';
import { aiTask } from '@/config/db/schema';
import { respData, respErr } from '@/shared/lib/resp';
import { getUserInfo } from '@/shared/models/user';

export async function GET(req: Request) {
  try {
    const user = await getUserInfo(req.headers);
    if (!user) return respErr('no auth, please sign in');

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50);
    const mediaType = searchParams.get('mediaType');

    const tasks = await db()
      .select()
      .from(aiTask)
      .where(
        and(
          eq(aiTask.userId, user.id),
          mediaType ? eq(aiTask.mediaType, mediaType) : undefined,
        )
      )
      .orderBy(desc(aiTask.createdAt))
      .limit(limit)
      .offset((page - 1) * limit);

    // Parse JSON fields for frontend
    const parsed = tasks.map((t: any) => ({
      ...t,
      taskInfo: t.taskInfo ? JSON.parse(t.taskInfo) : null,
      options: t.options ? JSON.parse(t.options) : null,
    }));

    return respData({ tasks: parsed, page, limit });
  } catch (e: any) {
    return respErr(e.message);
  }
}
