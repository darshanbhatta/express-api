import Database from "src/lib/Database";
import request from "supertest";
import app, { setupApp } from "src/app";

const db = new Database({
    url: process.env.MONGO_URI,
});

describe("Test the template route", () => {
    beforeAll(async () => {
        await setupApp(db);
    });

    it("It should respond with 200 and the correct message", async () => {
        const testId = "testuser";

        // Call the API and check if it returns the expected response
        const res = await request(app).get(`/hello/world/${testId}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe(`Hello, ${testId}!`);
    });

    afterAll(async () => {
        await db.disconnect();
    });
});
