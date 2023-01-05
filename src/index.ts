import { startListening, setupApp } from "./app";
import logger from "./lib/Logger";

start();

async function start() {
    try {
        await setupApp();
        await startListening();
    } catch (err) {
        logger.error("failed to start app!", err);
        process.exit(1);
    }
}
