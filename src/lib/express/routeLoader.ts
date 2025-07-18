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

export async function loadRoutes(): Promise<Router> {
    const router = Router();
    const routesPath = "src/routes";

    await registerRouteHandlers(routesPath, router);

    const routeCount = router.stack.length;
    logger.info(`${routeCount} route${routeCount === 1 ? "" : "s"} loaded`);

    return router;
}

async function registerRouteHandlers(dir: string, router: Router): Promise<void> {
    const files = readdirSync(dir);

    for (const file of files) {
        const filePath = join(dir, file);
        const fileStat = statSync(filePath);

        if (fileStat.isDirectory()) {
            await registerRouteHandlers(filePath, router);
        } else if ((extname(file) === ".ts" || extname(file) === ".js") && !file.includes(".test.")) {
            try {
                // Convert file path to proper ESM import path (file:// URL for absolute paths)
                const fileUrl = new URL(`file://${process.cwd()}/${filePath}`).href;
                const routeHandler = await import(fileUrl);

                if (routeHandler?.route) {
                    const { method, path, middlewares = [], handler } = routeHandler.route;
                    router[method](path, handler.validator, ...middlewares, handler.handler);
                } else {
                    logger.warn(`Missing route in ${filePath}`);
                }
            } catch (error) {
                logger.error(`Failed to load route from ${filePath}:`, error);
            }
        }
    }
}
