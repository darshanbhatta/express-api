import { z } from "zod";
import { rateLimiter } from "src/middlewares/rateLimiter.middleware";
import { RouteConfig } from "src/lib/express/routeLoader";
import { createHandler } from "src/lib/express/createHandler";

const handler = createHandler(
    {
        params: z.object({
            id: z.string().min(1),
        }),
    },
    async (req, res) => {
        const { id } = req.params;
        const { posts } = req.db.models;

        await posts.create({ title: id, content: "test" });

        req.logger.info("Post added");

        return res.status(200).json({
            message: "Post added",
        });
    }
);

export const route: RouteConfig = {
    method: "get",
    path: "/posts/add/:id",
    middlewares: [rateLimiter()],
    handler,
};
