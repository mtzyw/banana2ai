import { eq } from 'drizzle-orm';
import { db } from '@/core/db';
import { providerKey } from '@/config/db/schema';
import {
  AIManager,
  FalProvider,
  GeminiProvider,
  KieProvider,
  ReplicateProvider,
} from '@/extensions/ai';
import { KeyPool, KeySlot } from '@/extensions/ai/key-pool';
import { Configs, getAllConfigs } from '@/shared/models/config';

// ── Key Pool (in-memory singletons) ──

let keyPools: Map<string, KeyPool> | null = null;

async function initKeyPools(): Promise<Map<string, KeyPool>> {
  if (keyPools) return keyPools;

  keyPools = new Map();

  // Load all active keys from DB
  const keys = await db()
    .select()
    .from(providerKey)
    .where(eq(providerKey.status, 'active'))
    .orderBy(providerKey.priority);

  for (const k of keys) {
    let pool = keyPools.get(k.provider);
    if (!pool) {
      pool = new KeyPool(k.provider);
      keyPools.set(k.provider, pool);
    }

    // Create provider instance for this key
    let provider;
    if (k.provider === 'kie') {
      provider = new KieProvider({ apiKey: k.apiKey, customStorage: true });
    }
    // Future: else if (k.provider === 'freepik') { ... }

    if (provider) {
      pool.addSlot({
        id: k.id,
        key: k.apiKey,
        provider,
        rpmLimit: k.rpmLimit,
        dailyLimit: k.dailyLimit,
        priority: k.priority,
        activeCount: 0,
        minuteCount: 0,
        minuteStart: Date.now(),
        cooldownUntil: 0,
        consecutiveErrors: 0,
      });
    }
  }

  // Fallback: if no DB keys, try env var (backward compat)
  if (!keyPools.has('kie')) {
    const configs = await getAllConfigs();
    if (configs.kie_api_key) {
      const pool = new KeyPool('kie');
      const provider = new KieProvider({
        apiKey: configs.kie_api_key,
        customStorage: configs.kie_custom_storage === 'true',
      });
      pool.addSlot({
        id: 'env-kie-default',
        key: configs.kie_api_key,
        provider,
        rpmLimit: 10,
        dailyLimit: 0,
        priority: 0,
        activeCount: 0,
        minuteCount: 0,
        minuteStart: Date.now(),
        cooldownUntil: 0,
        consecutiveErrors: 0,
      });
      keyPools.set('kie', pool);
    }
  }

  return keyPools;
}

/**
 * Get a provider + slot via key pool (for generation with load balancing)
 */
export async function acquireProvider(providerName: string) {
  const pools = await initKeyPools();
  const pool = pools.get(providerName);
  if (!pool || pool.size === 0) {
    throw new Error(`No keys configured for provider: ${providerName}`);
  }
  return pool.acquire();
}

export function getKeyPool(providerName: string): KeyPool | undefined {
  return keyPools?.get(providerName);
}

/**
 * Force refresh key pools (after admin adds/removes keys)
 */
export function resetKeyPools() {
  keyPools = null;
}

// ── Legacy AIManager (backward compat for query route etc.) ──

export function getAIServiceWithConfigs(configs: Configs) {
  const aiManager = new AIManager();

  if (configs.kie_api_key) {
    aiManager.addProvider(
      new KieProvider({
        apiKey: configs.kie_api_key,
        customStorage: configs.kie_custom_storage === 'true',
      })
    );
  }

  if (configs.replicate_api_token) {
    aiManager.addProvider(
      new ReplicateProvider({
        apiToken: configs.replicate_api_token,
        customStorage: configs.replicate_custom_storage === 'true',
      })
    );
  }

  if (configs.fal_api_key) {
    aiManager.addProvider(
      new FalProvider({
        apiKey: configs.fal_api_key,
        customStorage: configs.fal_custom_storage === 'true',
      })
    );
  }

  if (configs.gemini_api_key) {
    aiManager.addProvider(
      new GeminiProvider({
        apiKey: configs.gemini_api_key,
      })
    );
  }

  return aiManager;
}

// Keep legacy alias
export const getAIManagerWithConfigs = getAIServiceWithConfigs;

let aiService: AIManager | null = null;

export async function getAIService(configs?: Configs): Promise<AIManager> {
  if (!configs) {
    configs = await getAllConfigs();
  }
  aiService = getAIServiceWithConfigs(configs);
  return aiService;
}
