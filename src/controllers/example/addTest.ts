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
    await req.db.models.tests.create({
        test: id,
    });

    req.logger.info("Test added");

    return res.status(200).json({
        message: "Test added",
    });
}
