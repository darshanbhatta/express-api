import Database from "src/lib/Database";
import request from "supertest";
import app, { setupApp } from "src/app";

const db = new Database({
    url: process.env.MONGO_URI,
});

describe("Test the example routes", () => {
    beforeAll(async () => {
        await setupApp(db);
    });

    it.only("It should add item to DB and respond with 200", async () => {
        const randomString = (Math.random() + 1).toString(36).substring(7);

        // call the api and see if it returns the expected response
        const res = await request(app).get(`/example/add/${randomString}`);
        expect(res.status).toBe(200);

        // check if the value is in the db
        const result = await db.models.tests.findOne({ name: randomString });
        expect(result).toBeTruthy();

        // delete the value from the db
        await db.models.tests.deleteOne({ name: randomString });
    });

    afterAll(async () => {
        await db.disconnect();
    });
});
