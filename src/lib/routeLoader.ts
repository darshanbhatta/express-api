import { RequestHandler, Router } from "express";

export interface RouteConfig {
    method: "get" | "post" | "put" | "delete" | "patch";
    path: string;
    middlewares?: RequestHandler[];
    handler: {
        handler: RequestHandler;
        validator: RequestHandler;
    };
}

// routeLoader.ts (updated)
import { readdirSync, statSync } from "fs";
import { join, extname } from "path";
import logger from "./Logger";

function loadControllers(dir: string, router: Router) {
    const files = readdirSync(dir);

    files.forEach(file => {
        const filePath = join(dir, file);
        const fileStat = statSync(filePath);

        if (fileStat.isDirectory()) {
            loadControllers(filePath, router);
        } else if (extname(file) === ".ts" || extname(file) === ".js") {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const controller = require(filePath);

            if (controller && controller.route) {
                const { method, path, middlewares = [], handler } = controller.route;
                router[method](path, handler.validator, ...middlewares, handler.handler);
            } else {
                logger.warn(`Missing route in ${filePath}`);
            }
        }
    });
}

export function loadRoutes(): Router {
    const router = Router();
    const controllersPath = "src/controllers";

    loadControllers(controllersPath, router);

    const routeCount = router.stack.length;
    logger.info(`${routeCount} route${routeCount === 1 ? "" : "s"} loaded`);

    return router;
}
