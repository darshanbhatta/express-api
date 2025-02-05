import { z } from "zod";
import { rateLimiter } from "src/middlewares/rateLimiter.middleware";
import { RouteConfig } from "src/lib/routeLoader";
import { createHandler } from "src/lib/createHandler";

const handler = createHandler(
    {
        params: z.object({
            id: z.string().min(3),
        }),
    },
    async (req, res) => {
        const { id } = req.params;

        return res.status(200).json({
            message: `Hello, ${id}!`,
        });
    }
);

export const route: RouteConfig = {
    method: "get",
    path: "/hello/world/:id",
    middlewares: [rateLimiter()],
    handler,
};
