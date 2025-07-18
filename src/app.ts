import "./env";
import express from "express";
import Database from "./database";

import initializeBaseMiddlewares from "./middlewares";
import logger from "./lib/express/Logger";
import { loadRoutes } from "./lib/express/routeLoader";
import { route as defaultRoute } from "./routes/default.route";

const app = express();

const PORT = process.env.PORT || 8080;

export async function setupApp(db: Database) {
    logger.info("setting up app");
    app.use((req, _, next) => {
        req.db = db;
        req.logger = logger;
        next();
    });
    logger.info("initializing base middlewares");
    initializeBaseMiddlewares(app);
    logger.info("connecting to mongodb");
    await db.connect();

    logger.info("loading routes");
    app.get("/", defaultRoute.handler.validator, defaultRoute.handler.handler);
    app.use("/", await loadRoutes());
}

export async function startListening() {
    await new Promise<void>(res => {
        app.listen(PORT, () => {
            logger.info(`Listening on port ${PORT}!`);
            res();
        });
    });
}

export default app;
