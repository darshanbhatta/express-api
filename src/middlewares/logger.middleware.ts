import { Request, NextFunction } from "express";

const ignoreLogRoutes: string[] = ["/"];

/**
 * Default logger middleware, logs all requests besides the ones in ignoreLogRoutes
 */
export const loggerMiddleware = (req: Request, res, next: NextFunction) => {
    if (!ignoreLogRoutes.includes(req.originalUrl)) {
        req.logger.log("info", "r", {
            timestamp: new Date().toISOString(),
            ip: req.clientIp,
            path: req.originalUrl,
            body: req.body ? req.body : {},
        });
    }
    next();
};
