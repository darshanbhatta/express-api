import { Handler, ZodRequestSchema, ZRequest, ZResponse } from "express";
import { createValidator } from "src/lib/zod/zodExpressValidator";

export function createHandler<S extends ZodRequestSchema>(
    schema: S,
    handler: (req: ZRequest<S>, res: ZResponse) => Promise<any>
): { validator: Handler; handler: Handler } {
    const [_, validator] = createValidator(schema);

    const typedHandler: Handler = (req, res) => handler(req as ZRequest<S>, res as ZResponse);

    return {
        validator,
        handler: typedHandler,
    };
}
