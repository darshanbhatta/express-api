import { ZRequest, ZResponse } from "express";
import { createValidator } from "src/lib/zodExpressValidator";
import { z } from "zod";

// Defining the schema object as a collection of ZodType instances
export const [schema, validator] = createValidator({
    body: z.object({
        test: z.string(),
    }),
    response: z.object({}),
    params: z.object({
        id: z.number().int(),
    }),
});

export async function handler(req: ZRequest<typeof schema>, res: ZResponse<typeof schema>) {
    const { test } = req.body;

    const { db } = req;

    await db.models.tests.create({
        test,
    });

    res.json({
        message: "Test added",
    });

    return res.status(200).json({
        message: "Test added",
    });
}
