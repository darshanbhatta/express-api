import winston, { transport } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";

// timezone of log message's timestamp
const timezone = () =>
    new Date().toLocaleString("en-US", {
        timeZone: "America/Chicago",
    });

// format specs of log message
const formatterSpecs = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: timezone }),
    winston.format.metadata({ fillExcept: ["message", "level", "timestamp", "label"] }),
    winston.format.printf(
        info =>
            `[${info.timestamp}] | ${info.level} : ${info.message} ${
                info.metadata && Object.keys(info.metadata).length !== 0
                    ? `\n${JSON.stringify(info.metadata, null, 2)}\n`
                    : ""
            }`
    )
);

// creating a new file transport, any logs will be output to a file with the following specs
const fileTransport = new DailyRotateFile({
    dirname: path.join(process.cwd(), "logs"),
    filename: "%DATE%.log",
    datePattern: "YYYY-MM-DD-HH",
    zippedArchive: false,
    maxFiles: "7d",
});

const transports: transport[] = [fileTransport, new winston.transports.Console()];

const logger = winston.createLogger({
    format: formatterSpecs,
    transports: transports,
});

export default logger;
