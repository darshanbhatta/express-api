import rateLimit, { Options } from "express-rate-limit";

/**
 * Creates a mw for rate limiting
 * Defaults to 100 req/15 mins
 * @param options
 * @returns
 */
export function rateLimiter(options?: Partial<Options>) {
    return rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
        ...options,
    });
}
