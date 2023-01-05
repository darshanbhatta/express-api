import mongoose, { ConnectOptions } from "mongoose";
import models from "./models";

interface IDatabase {
    url: string;
    config: ConnectOptions;
    connection: mongoose.Connection;
    models: typeof models;
    connect: () => Promise<void>;
}

class Database implements IDatabase {
    url: string;
    config: mongoose.ConnectOptions;
    connection: mongoose.Connection;
    models: typeof models;

    constructor ({ url, ...config }) {
        this.url = url;
        this.config = config;
        this.models = models;
    }

    async connect () {
        await mongoose.connect(this.url, {
            ...this.config,
        });
        this.connection = mongoose.connection;
    }
}

export default Database;
