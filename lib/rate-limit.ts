/**
 * Simple in-memory rate limiter
 * Per-IP daily limits. Zero cost, zero dependencies.
 * Cleans up stale entries every 10 minutes.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number; // timestamp when this window resets
}

const store = new Map<string, RateLimitEntry>();

// Auto-cleanup stale entries every 10 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store) {
      if (now > entry.resetAt) {
        store.delete(key);
      }
    }
  }, 10 * 60 * 1000);
}

/**
 * Check if a request should be rate limited
 * @param key - unique identifier (usually IP + endpoint)
 * @param limit - max requests allowed in the window
 * @param windowMs - time window in milliseconds (default: 24 hours)
 * @returns { allowed: boolean, remaining: number, resetAt: number }
 */
export function checkRateLimit(
  key: string,
  limit: number = 5,
  windowMs: number = 24 * 60 * 60 * 1000
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = store.get(key);

  // No existing entry or window expired → create new
  if (!entry || now > entry.resetAt) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: limit - 1, resetAt };
  }

  // Window still active
  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return { allowed: true, remaining: limit - entry.count, resetAt: entry.resetAt };
}

/**
 * Extract client IP from Next.js request headers
 */
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}
