interface Bucket {
  tokens: number;
  lastRefill: number;
}

const buckets = new Map<string, Bucket>();
let lastCleanup = Date.now();

/**
 * Basic in-memory token-bucket rate limiter.
 * Refills tokens continuously relative to the time window.
 * 
 * @param ip Client IP address
 * @param limit Maximum number of requests allowed in the window
 * @param windowMs Time window in milliseconds (default 1 minute)
 */
export function checkRateLimit(ip: string, limit: number = 10, windowMs: number = 60000) {
  const now = Date.now();

  // Passive cleanup of expired buckets every 5 minutes
  if (now - lastCleanup > 300000) {
    for (const [key, val] of buckets.entries()) {
      if (now - val.lastRefill > 600000) { // stale for over 10 mins
        buckets.delete(key);
      }
    }
    lastCleanup = now;
  }

  const bucket = buckets.get(ip) || { tokens: limit, lastRefill: now };

  // Calculate elapsed time and add fractional tokens
  const elapsed = now - bucket.lastRefill;
  const tokensToAdd = (elapsed * limit) / windowMs;
  
  if (tokensToAdd > 0) {
    bucket.tokens = Math.min(limit, bucket.tokens + tokensToAdd);
    bucket.lastRefill = now;
  }

  if (bucket.tokens >= 1) {
    bucket.tokens -= 1;
    buckets.set(ip, bucket);
    return { success: true, remaining: Math.floor(bucket.tokens) };
  }

  return { success: false, remaining: 0 };
}

/**
 * Extract client IP address from request headers.
 */
export function getClientIp(request: Request): string {
  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim();
  }
  const xRealIp = request.headers.get('x-real-ip');
  if (xRealIp) {
    return xRealIp.trim();
  }
  return '127.0.0.1'; // local fallback
}
