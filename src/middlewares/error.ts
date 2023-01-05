import { isCelebrateError } from "celebrate";
import { NextFunction, Response } from "express";
import { CRequest } from "src/@types/Express";

/**
 * Error handling middleware
 */
const errorHandling = (err: Error, req: CRequest, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === "development") {
        req.app.get("logger").error(`${req.path}: `, err);
    }
    if (isCelebrateError(err)) {
        return res.status(400).json({ msg: "Validation failed!" });
    }

    return res.status(400).json({ msg: err.message });
};

export default errorHandling;
