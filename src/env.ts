import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
    path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`),
});

import { z } from "zod";

/**
 * Defines the environment variables that are required for the application to run.
 * Change this to add or remove environment variables.
 */
const envSchema = z.object({
    /** The environment that the application is running in. */
    NODE_ENV: z.enum(["development", "production", "test"]),

    /** The port that the application will run on. If this is not set then it will use a default number in the code */
    PORT: z.preprocess(a => parseInt(a as string, 10), z.number().positive()).optional(),

    /** MongoDB connection string. */
    MONGO_URI: z.string(),
});

// validate the environment variables and throw an error if any are missing
envSchema.parse(process.env);

// add the environment variables to the NodeJS.ProcessEnv interface
declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envSchema> {}
    }
}
