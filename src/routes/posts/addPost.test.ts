import { describe, it, expect, beforeAll, afterAll } from "vitest";
import Database from "src/database";
import request from "supertest";
import app, { setupApp } from "src/app";

const db = new Database({
    url: process.env.MONGO_URI,
});

describe("Test the addPost route", () => {
    beforeAll(async () => {
        await setupApp(db);
    });

    it.only("It should add item to DB and respond with 200", async () => {
        const randomString = (Math.random() + 1).toString(36).substring(7);

        const res = await request(app).get(`/posts/add/${randomString}`);
        expect(res.status).toBe(200);

        const result = await db.models.posts.findOne({ title: randomString });
        expect(result).toBeTruthy();

        await db.models.posts.deleteOne({ title: randomString });
    });

    afterAll(async () => {
        await db.disconnect();
    });
});
