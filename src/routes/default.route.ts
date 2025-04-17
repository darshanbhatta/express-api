import { rateLimiter } from "src/middlewares/rateLimiter.middleware";
import { RouteConfig } from "src/lib/routeLoader";
import { createHandler } from "src/lib/createHandler";
import { z } from "zod";

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
