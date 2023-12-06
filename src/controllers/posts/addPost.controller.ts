import { ZRequest, ZResponse } from "express";
import { createValidator } from "src/lib/zodExpressValidator";
import { z } from "zod";

// Defining the schema object as a collection of ZodType instances
export const [schema, validator] = createValidator({
    params: z.object({
        id: z.string().min(1),
    }),
});

export async function handler(req: ZRequest<typeof schema>, res: ZResponse<typeof schema>) {
    const { id } = req.params;
    const { posts } = req.db.models;

    // add a new post to the db
    await posts.create({ title: id, content: "test" });

    req.logger.info("Post added");

    return res.status(200).json({
        message: "Post added",
    });
}
