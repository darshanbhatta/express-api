import "./env";
import express from "express";
import Database from "./lib/Database";
import routes from "./routes";

import initializeBaseMiddlewares from "./middlewares";
import logger from "./lib/Logger";
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

    app.get("/", (_, res) =>
        res.json({
            message: `${process.env.npm_package_name} connected @ ${new Date().toISOString()}`,
        })
    );

    app.use("/", routes);
}

export async function startListening() {
    await new Promise<void>(res => {
        app.listen(PORT, () => res());
    });
    logger.log("info", `Listening on port ${PORT}!`);
}

export default app;
