import { NextFunction, Request, Response } from "express";

/**
 * Error handling middleware
 */
const errorHandling = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === "development") {
        req.app.get("logger").error(`${req.path}: `, err);
    }

    return res.status(400).json({ msg: err.message });
};

export default errorHandling;
