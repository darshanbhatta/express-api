import { ZRequest, ZResponse } from "express";
import { createValidator } from "src/lib/zodExpressValidator";
import { z } from "zod";

// Defining the schema object as a collection of ZodType instances
export const [schema, validator] = createValidator({
    body: z.object({
        test: z.string(),
    }),
    response: z.object({
        message: z.string({
            description: "A message",
        }),
    }),
    params: z.object({
        id: z.number().int(),
    }),
});

export async function handler(req: ZRequest<typeof schema>, res: ZResponse<typeof schema>) {
    const { test } = req.body;

    req.logger.info(req.params.id);

    await req.db.models.tests.create({
        test,
    });

    req.logger.info("Test added");

    return res.status(200).json({
        message: "Test added",
    });
}
