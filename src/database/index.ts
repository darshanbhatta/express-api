import mongoose from "mongoose";

import { IModels, models } from "./models";

class Database {
    url: string;
    config: mongoose.ConnectOptions;
    models: IModels;

    constructor({ url, ...config }) {
        this.url = url;
        this.config = config;
        this.models = models;
    }

    async connect() {
        await mongoose.connect(this.url, {
            ...this.config,
        });
    }

    async disconnect() {
        await mongoose.disconnect();
        await mongoose.connection.close();
    }
}

export default Database;
