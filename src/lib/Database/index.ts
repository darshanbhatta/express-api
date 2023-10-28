import mongoose, { ConnectOptions } from "mongoose";

import models from "./models";

interface IDatabase {
    url: string;
    config: ConnectOptions;
    models: typeof models;
    connect: () => Promise<void>;
}

class Database implements IDatabase {
    url: string;
    config: mongoose.ConnectOptions;
    models: typeof models;

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
}

export default Database;
