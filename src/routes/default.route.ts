import { z } from "zod";
import { rateLimiter } from "src/middlewares/rateLimiter.middleware";
import { RouteConfig } from "src/lib/express/routeLoader";
import { createHandler } from "src/lib/express/createHandler";

const handler = createHandler(
    {
        params: z.object({
            id: z
                .string()
                .min(20)
                .optional()
                .describe("The id of the user (optional) This is just an example paramter"),
        }),
        response: z.object({
            message: z
                .string()
                .optional()
                .describe("The message of the user (optional) This is just an example response"),
        }),
    },
    async (req, res) => {
        const { id } = req.params;

        // Do some computationally intensive math operations
        const startTime = Date.now();

        let result = 0;
        for (let i = 0; i < 1000000; i++) {
            result += Math.sqrt(Math.pow(i, 2) + Math.pow(i + 1, 2));
            result %= Number.MAX_SAFE_INTEGER;
        }

        const duration = Date.now() - startTime;
        req.logger.info(`Completed math calculations in ${duration}ms: ${result}`);

        res.status(200).json({
            message: `${process.env.npm_package_name} connected @ ${new Date().toISOString()}${
                id ? ` with id ${id}` : ""
            }`,
        });
    }
);

export const route: RouteConfig = {
    method: "get",
    path: "/",
    middlewares: [rateLimiter()],
    handler,
};
