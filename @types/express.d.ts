import Database from "../src/lib/Database";
import Logger from "../src/lib/Logger";
import { z } from "zod";

declare module "express-serve-static-core" {
    interface Request {
        db: Database;
        logger: typeof Logger;
    }
}

declare module "express" {
    interface ZodRequestSchema {
        body?: z.ZodTypeAny;
        response?: z.ZodTypeAny;
        params?: z.ZodTypeAny;
        query?: z.ZodTypeAny;
    }

    type ZRequest<T extends ZodRequestSchema = {}> = Request<
        z.infer<T["params"] extends z.AnyZodObject ? T["params"] : z.AnyZodObject>,
        z.infer<T["response"] extends z.AnyZodObject ? T["response"] : z.AnyZodObject>,
        z.infer<T["body"] extends z.AnyZodObject ? T["body"] : z.AnyZodObject>,
        z.infer<T["query"] extends z.AnyZodObject ? T["query"] : z.AnyZodObject>
    >;

    type ZResponse<T extends ZodRequestSchema = {}> = Response<
        z.infer<T["response"] extends z.AnyZodObject ? T["response"] : z.AnyZodObject>
    >;
}
