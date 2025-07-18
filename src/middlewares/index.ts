import { Express } from "express";

import cors from "cors";
import helmet from "helmet";
import { mw as requestIpMiddleware } from "request-ip";
import bodyParser from "body-parser";
import { loggerMiddleware } from "./logger.middleware";
import { compressionMiddleware } from "./compression.middleware";

export default function initializeBaseMiddlewares(app: Express) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(compressionMiddleware);

    app.use(helmet());
    app.use(cors());

    app.use(requestIpMiddleware());
    app.use("/", loggerMiddleware);
}
