import "./env";

import express from "express";

import Database from "./lib/Database";

import routes from "./routes";

import initializeBaseMiddlewares from "./middlewares";
import logger from "./lib/Logger";

const app = express();

const PORT = process.env.PORT || 8080;

const db = new Database({
    url: process.env.MONGO_URI,
});

export async function setupApp() {
    initializeBaseMiddlewares(app);
    // Connect to MongoDB
    await db.connect();

    app.use((req, _, next) => {
        req.db = db;
        req.logger = logger;
        next();
    });

    app.use("/", routes);
}

export async function startListening() {
    await new Promise<void>(res => {
        app.listen(PORT, () => res());
    });
    logger.log("info", `Listening on port ${PORT}!`);
}

export default app;
