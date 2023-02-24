import { Controller, CRequest } from "src/@types/Express";
import { Response } from "express";
import { validateRequest } from "src/lib/zodExpressValidator";
import { z } from "zod";

const schema = {
    body: z.object({
        test: z.string(),
    }),
};

const validator = validateRequest(schema);

async function handler (req: CRequest, res: Response): Promise<Response> {
    const { test } = req.body;
    const db = req.app.get("db");

    await db.models.tests.create({
        test,
    });

    return res.status(200).json({
        message: "Test added",
    });
}

const controller: Controller = [validator, handler];

export default controller;
