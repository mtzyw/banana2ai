import { NextRequest, NextResponse } from 'next/server';
import { getUserInfo } from '@/shared/models/user';
import { getStorageService } from '@/shared/services/storage';
import { db } from '@/core/db';
import { sql } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const user = await getUserInfo(request.headers);
    if (!user) {
      return NextResponse.json({ code: -1, message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files.length) {
      return NextResponse.json({ code: -1, message: 'No files provided' }, { status: 400 });
    }

    const storage = await getStorageService();
    const urls: string[] = [];

    for (const file of files) {
      const ext = file.name.split('.').pop() || 'png';
      const key = `user-upload/${user.id}/${uuidv4()}.${ext}`;
      const buffer = Buffer.from(await file.arrayBuffer());

      const result = await storage.uploadFile({
        body: buffer,
        key,
        contentType: file.type || 'image/png',
      });

      if (result.success && result.url) {
        urls.push(result.url);
        // Record in user_asset table (fire-and-forget)
        db().execute(sql`INSERT INTO user_asset (user_id, url, filename, content_type, size_bytes, source)
          VALUES (${user.id}, ${result.url}, ${file.name}, ${file.type}, ${file.size}, 'upload')`).catch(() => {});
      } else {
        return NextResponse.json({ code: -1, message: result.error || 'Upload failed' }, { status: 500 });
      }
    }

    return NextResponse.json({ code: 0, data: { urls } });
  } catch (err: any) {
    return NextResponse.json({ code: -1, message: err.message }, { status: 500 });
  }
}

/** GET: List user's uploaded assets */
export async function GET(request: NextRequest) {
  try {
    const user = await getUserInfo(request.headers);
    if (!user) {
      return NextResponse.json({ code: -1, message: 'Unauthorized' }, { status: 401 });
    }

    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '50');
    const offset = parseInt(request.nextUrl.searchParams.get('offset') || '0');

    const [assets, countResult] = await Promise.all([
      db().execute(sql`
        SELECT id, url, filename, content_type, size_bytes, created_at
        FROM user_asset
        WHERE user_id = ${user.id}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `),
      db().execute(sql`SELECT COUNT(*)::int as total FROM user_asset WHERE user_id = ${user.id}`),
    ]);

    const total = (countResult.rows ?? countResult)?.[0]?.total ?? 0;
    return NextResponse.json({ code: 0, data: { assets: assets.rows ?? assets, total } });
  } catch (err: any) {
    return NextResponse.json({ code: -1, message: err.message }, { status: 500 });
  }
}
