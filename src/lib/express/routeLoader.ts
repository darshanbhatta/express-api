import { RequestHandler, Router } from "express";
import { readdirSync, statSync } from "fs";
import { join, extname } from "path";
import logger from "./Logger";

export interface RouteConfig {
    method: "get" | "post" | "put" | "delete" | "patch";
    path: string;
    middlewares?: RequestHandler[];
    handler: {
        handler: RequestHandler;
        validator: RequestHandler;
    };
}

export function loadRoutes(): Router {
    const router = Router();
    const routesPath = "src/routes";

    registerRouteHandlers(routesPath, router);

    const routeCount = router.stack.length;
    logger.info(`${routeCount} route${routeCount === 1 ? "" : "s"} loaded`);

    return router;
}

function registerRouteHandlers(dir: string, router: Router) {
    const files = readdirSync(dir);

    files.forEach(file => {
        const filePath = join(dir, file);
        const fileStat = statSync(filePath);

        if (fileStat.isDirectory()) {
            registerRouteHandlers(filePath, router);
        } else if ((extname(file) === ".ts" || extname(file) === ".js") && !file.includes(".test.")) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const routeHandler = require(filePath);

            if (routeHandler?.route) {
                const { method, path, middlewares = [], handler } = routeHandler.route;
                router[method](path, handler.validator, ...middlewares, handler.handler);
            } else {
                logger.warn(`Missing route in ${filePath}`);
            }
        }
    });
}
