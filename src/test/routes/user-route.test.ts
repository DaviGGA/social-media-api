import { TestDatabase } from "../../database/test-database";
import { expect, test, describe, beforeAll, afterAll, afterEach } from 'vitest';
const request = require('supertest');
import { User } from '../../entities/User';
import { App } from "../../app";
import { Request, Response } from "supertest";

let db: TestDatabase;
let app: App;

beforeAll(async () => {   
    db = new TestDatabase();
    app = new App(db);
    await db.connectDatabase();
})

afterEach( async () => {
    await db.clearTable(User);
})

afterAll(async () => {
    await db.disconnectDatabase();    
})



describe("POST requests", () => {

    test("/user/", async () => {

        let res: Response = await request(app.server)
        .post('/user')
        .send({
            email:"johndoe@domain.com",
            password:"Test1234!",
            confirm_password:"Test1234!"
        })

        expect(res.statusCode).toBe(201);
        expect(res.body.data).toMatchObject({
            email:"johndoe@domain.com",
        })

        
    })
})