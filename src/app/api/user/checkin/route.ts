import { and, eq, desc } from 'drizzle-orm';
import { db } from '@/core/db';
import { checkin } from '@/config/db/schema';
import { getUuid } from '@/shared/lib/hash';
import { respData, respErr } from '@/shared/lib/resp';
import { getUserInfo } from '@/shared/models/user';
import { grantCreditsForUser } from '@/shared/models/credit';

// 7-day streak reward schedule
const STREAK_REWARDS = [3, 3, 5, 5, 8, 8, 15]; // day 1-7

function getTodayStr(): string {
  return new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
}

function getYesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export async function POST(req: Request) {
  try {
    const user = await getUserInfo(req.headers);
    if (!user) return respErr('no auth, please sign in');

    const today = getTodayStr();

    // Check if already checked in today
    const [existing] = await db()
      .select()
      .from(checkin)
      .where(and(eq(checkin.userId, user.id), eq(checkin.checkinDate, today)))
      .limit(1);

    if (existing) {
      return respErr('already checked in today');
    }

    // Get yesterday's record to calculate streak
    const [yesterday] = await db()
      .select()
      .from(checkin)
      .where(and(eq(checkin.userId, user.id), eq(checkin.checkinDate, getYesterdayStr())))
      .limit(1);

    const streak = yesterday ? (yesterday.streak % 7) + 1 : 1;
    const rewardCredits = STREAK_REWARDS[streak - 1] || 3;

    // Create checkin record
    await db().insert(checkin).values({
      id: getUuid(),
      userId: user.id,
      checkinDate: today,
      streak,
      credits: rewardCredits,
    });

    // Grant credits
    await grantCreditsForUser({
      user: user as any,
      credits: rewardCredits,
      validDays: 30,
      description: `Daily check-in reward (day ${streak})`,
    });

    return respData({
      streak,
      credits: rewardCredits,
      checkinDate: today,
    });
  } catch (e: any) {
    console.error('checkin failed', e);
    return respErr(e.message);
  }
}

// GET: check-in status
export async function GET(req: Request) {
  try {
    const user = await getUserInfo(req.headers);
    if (!user) return respErr('no auth, please sign in');

    const today = getTodayStr();

    // Today's record
    const [todayRecord] = await db()
      .select()
      .from(checkin)
      .where(and(eq(checkin.userId, user.id), eq(checkin.checkinDate, today)))
      .limit(1);

    // Last 7 records
    const recent = await db()
      .select()
      .from(checkin)
      .where(eq(checkin.userId, user.id))
      .orderBy(desc(checkin.checkinDate))
      .limit(7);

    // Calculate current streak
    let currentStreak = 0;
    if (todayRecord) {
      currentStreak = todayRecord.streak;
    } else {
      // Check if yesterday was checked in (streak still valid)
      const [yesterday] = await db()
        .select()
        .from(checkin)
        .where(and(eq(checkin.userId, user.id), eq(checkin.checkinDate, getYesterdayStr())))
        .limit(1);
      if (yesterday) {
        currentStreak = yesterday.streak; // streak continues but not yet claimed today
      }
    }

    return respData({
      checkedInToday: !!todayRecord,
      currentStreak,
      todayReward: todayRecord?.credits || STREAK_REWARDS[currentStreak % 7] || 3,
      nextReward: STREAK_REWARDS[currentStreak % 7] || 3,
      streakRewards: STREAK_REWARDS,
      recentCheckins: recent.map((r: any) => ({
        date: r.checkinDate,
        streak: r.streak,
        credits: r.credits,
      })),
    });
  } catch (e: any) {
    console.error('checkin status failed', e);
    return respErr(e.message);
  }
}
