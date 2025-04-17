import { rateLimiter } from "src/middlewares/rateLimiter.middleware";
import { RouteConfig } from "src/lib/routeLoader";
import { createHandler } from "src/lib/createHandler";

const handler = createHandler({}, async (_, res) =>
    res.status(200).json({
        message: `${process.env.npm_package_name} connected @ ${new Date().toISOString()}`,
    })
);

export const route: RouteConfig = {
    method: "get",
    path: "/",
    middlewares: [rateLimiter()],
    handler,
};
