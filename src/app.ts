import dotenv from "dotenv";
dotenv.config();

import express from "express";

import Database from "./lib/Database";

import routes from "./routes";

import config from "../config";

import initBaseMWs from "./middlewares/initBaseMWs";
import logger from "./lib/Logger";

const app = express();

const PORT = process.env.PORT || 8080;

const db = new Database(config.db);


export async function setupApp() {
    initBaseMWs(app);
    // Connect to MongoDB
    await db.connect();
    app.set("db", db);

    app.set("logger", logger);

    app.use("/", routes);
}

export async function startListening() {
    await new Promise<void>(res => {
        app.listen(PORT, () => res());
    });
    logger.log("info", `Listening on port ${PORT}!`);
}

export default app;
