import { TestDatabase } from "../../database/test-database";
import { expect, test, describe, beforeAll, afterAll, afterEach } from 'vitest';
const request = require('supertest');
import { User } from '../../entities/User';
import { App } from "../../app";

let db: TestDatabase;
let app: App;

beforeAll(async () => {
    db = new TestDatabase();
    app = new App(db);
    await db.connectDatabase();
})

afterAll(async () => {
    await db.disconnectDatabase();
})

afterEach( async () => {
    await db.clearTable(User);
})


describe("POST requests", () => {
    test("/user/", async () => {
        request(app.server)
        .post('/user')
        .send({
            email:"johndoe@domain.com",
            password:"Test1234!",
            confirm_password:"Test1234!"
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .end( (err: Error) => {
            if (err) throw err;
        })
    })
})