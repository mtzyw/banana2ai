import { and, desc, eq } from 'drizzle-orm';
import { db } from '@/core/db';
import { gallery } from '@/config/db/schema';
import { respData, respErr } from '@/shared/lib/resp';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50);
    const model = searchParams.get('model');
    const mediaType = searchParams.get('mediaType');

    const items = await db()
      .select()
      .from(gallery)
      .where(
        and(
          eq(gallery.status, 'active'),
          eq(gallery.isPublic, true),
          model ? eq(gallery.model, model) : undefined,
          mediaType ? eq(gallery.mediaType, mediaType) : undefined,
        )
      )
      .orderBy(desc(gallery.createdAt))
      .limit(limit)
      .offset((page - 1) * limit);

    return respData({ items, page, limit });
  } catch (e: any) {
    return respErr(e.message);
  }
}
