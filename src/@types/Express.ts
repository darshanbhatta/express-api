import { Request, RequestHandler } from "express";
import Database from "../lib/Database";
import Logger from "../lib/Logger";


export interface CRequest extends Request {
    app: Request["app"] & {
        get: Request["app"]["get"] & {
            (key: "db"): Database;
            (key: "db"): typeof Logger;
        };
    };
}

export type Controller = [
    validator: RequestHandler,
    handler: RequestHandler,
]
