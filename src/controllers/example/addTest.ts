import { Controller, CRequest } from "src/@types/Express";
// import { Response, Router, Request } from "express";
import { validateRequest } from "src/lib/zodExpressValidator";
import { z } from "zod";

const schema = {
    params: z.object({
        urlParameter: z.string(),
    }),
    body: z.object({
        bodyKey: z.number(),
    }),
    query: z.object({
        queryKey: z.string().length(64),
    }),
};

const validate = validateRequest(schema);

const handler = (req: CRequest, res) => {
    res.json({
        params: req.params,
        body: req.body,
        query: req.query,
    });
}

