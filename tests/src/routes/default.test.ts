import request from "supertest";
import app, { setupApp } from "../../../src/app";

describe("Test the root path", () => {
    beforeAll(async () => {
        await setupApp();
    });

    it("It should respond with 200", async () => {
        const res = await request(app).get("/").send();
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Connected!");
    });
});
