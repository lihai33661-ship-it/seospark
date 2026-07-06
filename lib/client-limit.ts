/**
 * Client-side usage tracking via localStorage
 * Second line of defense — survives serverless cold starts
 */

interface UsageRecord {
  date: string; // YYYY-MM-DD
  count: number;
}

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

function read(key: string): UsageRecord {
  try {
    const raw = localStorage.getItem(`spark_${key}`);
    if (!raw) return { date: getToday(), count: 0 };
    const record: UsageRecord = JSON.parse(raw);
    // Reset if it's a new day
    if (record.date !== getToday()) {
      return { date: getToday(), count: 0 };
    }
    return record;
  } catch {
    return { date: getToday(), count: 0 };
  }
}

function write(key: string, record: UsageRecord) {
  try {
    localStorage.setItem(`spark_${key}`, JSON.stringify(record));
  } catch {
    // localStorage full or disabled — silently fail
  }
}

/**
 * Check if user has remaining free uses
 * @returns { allowed, remaining, limit }
 */
export function checkClientLimit(key: string, limit: number): {
  allowed: boolean;
  remaining: number;
  limit: number;
} {
  const record = read(key);
  const allowed = record.count < limit;
  return {
    allowed,
    remaining: Math.max(0, limit - record.count),
    limit,
  };
}

/**
 * Record a usage. Call AFTER successful API response.
 */
export function recordClientUsage(key: string) {
  const record = read(key);
  record.count++;
  write(key, record);
}

/**
 * Get remaining uses for display
 */
export function getClientRemaining(key: string, limit: number): number {
  return checkClientLimit(key, limit).remaining;
}
