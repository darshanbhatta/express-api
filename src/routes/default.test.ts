import request from "supertest";
import app, { setupApp } from "src/app";
import Database from "src/database";

const db = new Database({
    url: process.env.MONGO_URI,
});

describe("Test the root path", () => {
    beforeAll(async () => {
        await setupApp(db);
    });

    it("It should respond with 200", async () => {
        const res = await request(app).get("/").send();
        expect(res.status).toBe(200);
        expect(res.body.message).toContain(`${process.env.npm_package_name} connected @`);
    });

    afterAll(async () => {
        await db.disconnect();
    });
});
