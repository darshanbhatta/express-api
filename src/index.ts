import { startListening, setupApp } from "./app";
import Database from "./lib/Database";
import logger from "./lib/Logger";

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
