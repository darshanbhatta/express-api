import { Request, Response } from "express";
import compression from "compression";

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

export const compressionMiddleware = compression({
    level: 7,
    filter: shouldCompress,
});
