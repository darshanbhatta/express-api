import { Express, NextFunction, Request } from "express";

import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { mw as requestIpMiddleware } from "request-ip";
import { urlencoded, json } from "body-parser";

export default function initializeBaseMiddlewares(app: Express) {
    app.use(json());
    app.use(urlencoded({ extended: false }));

    app.use(
        compression({
            level: 7,
            filter: shouldCompress,
        })
    );

    app.use(helmet());
    app.use(cors());

    app.use(requestIpMiddleware());

    app.use("/", defaultLogger);
}

const ignoreCompressions: string[] = [];
/**
 * Determines if a request should be compressed or not, useful for big payloads that
 * should not be compressed every time
 */
const shouldCompress = (req: Request, res: Response) => {
    if (req.headers["x-no-compression"] || ignoreCompressions.includes(req.originalUrl)) {
        return false;
    }
    return compression.filter(req, res);
};

const ignoreLogRoutes: string[] = ["/"];
/**
 * Default logger middleware, logs all requests besides the ones in ignoreLogRoutes
 */
const defaultLogger = (req: Request, res, next: NextFunction) => {
    if (!ignoreLogRoutes.includes(req.originalUrl)) {
        const logger = req.app.get("logger");
        logger.log("info", "r", {
            timestamp: new Date().toISOString(),
            ip: req.clientIp,
            path: req.originalUrl,
            body: req.body ? req.body : {},
        });
    }
    next();
};
