import type Database from "src/database";
import type Logger from "src/lib/express/Logger";
import { z } from "zod";
import { EmptyObject } from "./schema";

declare global {
    namespace Express {
        interface Request {
            db: Database;
            logger: typeof Logger;
        }
    }
}

declare module "express" {
    interface ZodRequestSchema {
        body?: EmptyObject;
        response?: EmptyObject;
        params?: EmptyObject;
        query?: EmptyObject;
    }

    type ZRequest<T extends ZodRequestSchema = {}> = Request<
        z.infer<T extends { params: infer P } ? (P extends z.ZodTypeAny ? P : never) : EmptyObject>,
        z.infer<T extends { response: infer R } ? (R extends z.ZodTypeAny ? R : never) : EmptyObject>,
        z.infer<T extends { body: infer B } ? (B extends z.ZodTypeAny ? B : never) : EmptyObject>,
        z.infer<T extends { query: infer Q } ? (Q extends z.ZodTypeAny ? Q : never) : EmptyObject>
    >;

    type ZResponse<T extends ZodRequestSchema = {}> = Response<
        z.infer<T extends { response: infer R } ? (R extends z.ZodTypeAny ? R : never) : EmptyObject>
    >;

    type ZHandler<T extends ZodRequestSchema = {}> = (
        req: ZRequest<T>,
        res: ZResponse<T>
    ) => Promise<ZResponse<T>> | ZResponse<T>;
}
