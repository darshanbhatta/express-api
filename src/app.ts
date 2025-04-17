import "./env";
import express from "express";
import Database from "./lib/Database";

import initializeBaseMiddlewares from "./middlewares";
import logger from "./lib/Logger";
import { loadRoutes } from "./lib/routeLoader";
import { route as defaultRoute } from "./routes/default.route";

const app = express();

const PORT = process.env.PORT || 8080;

export async function setupApp(db: Database) {
    app.use((req, _, next) => {
        req.db = db;
        req.logger = logger;
        next();
    });
    initializeBaseMiddlewares(app);
    // Connect to MongoDB
    await db.connect();

    app.get("/", defaultRoute.handler.validator, defaultRoute.handler.handler);

    app.use("/", loadRoutes());
}

export async function startListening() {
    await new Promise<void>(res => {
        app.listen(PORT, () => res());
    });
    logger.log("info", `Listening on port ${PORT}!`);
}

export default app;
