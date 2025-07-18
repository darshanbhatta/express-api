import { startListening, setupApp } from "./app";
import Database from "./database";
import logger from "./lib/express/Logger";

start();

async function start() {
    try {
        const db = new Database({
            url: process.env.MONGO_URI,
        });

        await setupApp(db);
        await startListening();
    } catch (err) {
        logger.error("failed to start app!", err);
        process.exit(1);
    }
}
