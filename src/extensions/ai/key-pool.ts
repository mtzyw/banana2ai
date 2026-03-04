import { eq } from 'drizzle-orm';
import { db } from '@/core/db';
import { providerKey } from '@/config/db/schema';
import { AIProvider } from './types';

export interface KeySlot {
  id: string;
  key: string;
  provider: AIProvider;
  rpmLimit: number;
  dailyLimit: number;
  priority: number;
  // In-memory tracking (fast path)
  activeCount: number;
  minuteCount: number;
  minuteStart: number;
  cooldownUntil: number;
  consecutiveErrors: number;
}

export class KeyPool {
  private slots: KeySlot[] = [];
  private roundRobinIndex = 0;
  private providerName: string;

  constructor(providerName: string) {
    this.providerName = providerName;
  }

  addSlot(slot: KeySlot) {
    this.slots.push(slot);
    // Sort by priority descending
    this.slots.sort((a, b) => b.priority - a.priority);
  }

  get size() { return this.slots.length; }
  get availableSize() { return this.getAvailableSlots().length; }

  /**
   * Acquire the best available provider + key slot.
   * Strategy: priority first, then least-loaded among same priority.
   */
  acquire(): { provider: AIProvider; slot: KeySlot } {
    const now = Date.now();
    const available = this.getAvailableSlots(now);

    if (available.length === 0) {
      throw new KeyPoolExhaustedError(
        `All ${this.providerName} keys exhausted. ` +
        `Total: ${this.slots.length}, ` +
        `Cooldown: ${this.slots.filter(s => s.cooldownUntil > now).length}`
      );
    }

    // Group by priority, pick highest priority group
    const maxPriority = available[0].priority;
    const topTier = available.filter(s => s.priority === maxPriority);

    // Within same priority: least activeCount
    topTier.sort((a, b) => a.activeCount - b.activeCount);
    const slot = topTier[0];

    // Update counters
    slot.activeCount++;
    this.resetMinuteWindowIfNeeded(slot, now);
    slot.minuteCount++;

    return { provider: slot.provider, slot };
  }

  /**
   * Release slot after request completes (success or handled error)
   */
  release(slot: KeySlot) {
    slot.activeCount = Math.max(0, slot.activeCount - 1);
  }

  /**
   * Report error on a slot. Applies cooldown/circuit-breaking.
   */
  onError(slot: KeySlot, error: Error) {
    slot.consecutiveErrors++;
    slot.activeCount = Math.max(0, slot.activeCount - 1);

    const now = Date.now();
    const is429 = error.message.includes('429') || error.message.toLowerCase().includes('rate limit');
    const is5xx = error.message.includes('500') || error.message.includes('502') || error.message.includes('503');

    if (is429) {
      // Rate limited: cooldown 60s, exponential backoff up to 5min
      const backoff = Math.min(60000 * Math.pow(2, slot.consecutiveErrors - 1), 300000);
      slot.cooldownUntil = now + backoff;
    } else if (is5xx) {
      // Server error: cooldown 30s
      slot.cooldownUntil = now + 30000;
    } else if (slot.consecutiveErrors >= 5) {
      // Too many consecutive errors: circuit break 2min
      slot.cooldownUntil = now + 120000;
    }

    // Persist error stats to DB (fire-and-forget)
    this.persistError(slot, error).catch(console.error);
  }

  /**
   * Report success — resets consecutive error counter
   */
  onSuccess(slot: KeySlot) {
    slot.consecutiveErrors = 0;
    slot.activeCount = Math.max(0, slot.activeCount - 1);
    // Persist usage stats periodically (every 10 requests)
    if (slot.minuteCount % 10 === 0) {
      this.persistUsage(slot).catch(console.error);
    }
  }

  // ── Private ──

  private getAvailableSlots(now = Date.now()): KeySlot[] {
    return this.slots.filter(slot => {
      // Not in cooldown
      if (slot.cooldownUntil > now) return false;
      // Not over RPM limit
      this.resetMinuteWindowIfNeeded(slot, now);
      if (slot.rpmLimit > 0 && slot.minuteCount >= slot.rpmLimit) return false;
      return true;
    });
  }

  private resetMinuteWindowIfNeeded(slot: KeySlot, now: number) {
    if (now - slot.minuteStart > 60000) {
      slot.minuteCount = 0;
      slot.minuteStart = now;
    }
  }

  private async persistError(slot: KeySlot, error: Error) {
    try {
      await db()
        .update(providerKey)
        .set({
          errorCount: slot.consecutiveErrors,
          lastError: error.message.slice(0, 500),
          totalErrors: slot.consecutiveErrors, // will be incremented via SQL later
          cooldownUntil: slot.cooldownUntil ? new Date(slot.cooldownUntil) : null,
        })
        .where(eq(providerKey.id, slot.id));
    } catch (e) { /* swallow */ }
  }

  private async persistUsage(slot: KeySlot) {
    try {
      await db()
        .update(providerKey)
        .set({
          lastUsedAt: new Date(),
          currentRpm: slot.minuteCount,
        })
        .where(eq(providerKey.id, slot.id));
    } catch (e) { /* swallow */ }
  }
}

export class KeyPoolExhaustedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'KeyPoolExhaustedError';
  }
}
