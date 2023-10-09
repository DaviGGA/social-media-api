import { TestDatabase } from "../../database/test-database";
import { expect, test, describe, beforeAll, afterAll, afterEach } from 'vitest';
const request = require('supertest');
import { Profile } from "../../entities/Profile";
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
    await db.clearTable(Profile);
})

afterAll(async () => {
    await db.disconnectDatabase();    
})

describe("Profile POST requests", () => {
    test("/profile/", async () => {
        let res: Response = await request(app.server)
        .post('/profile/')
        .send({
            name: 'John',
            surname: 'Doe',
            username: 'johnthecool'
        });
        
        expect(res.statusCode).toBe(201)
        expect(res.body.data).toMatchObject({
            name: 'John',
            surname: 'Doe',
            username: 'johnthecool'
        });
    });
})

describe("Profile PUT requests", () => {
    test("/profile/", async () => {
        let profile: Profile = new Profile();
        profile.name = 'John';
        profile.surname = 'Doe';
        profile.username = 'johnthecool';

        let newProfile: Profile = await db.manager.save(Profile,profile);

        let res: Response = await request(app.server)
        .put(`/profile/${newProfile.id}`)
        .send({
            name: 'John edited',
            surname: 'Doe edited',
            username: 'johntheedited',
        });
        
        expect(res.statusCode).toBe(200)
        expect(res.body.data).toMatchObject({
            name: 'John edited',
            surname: 'Doe edited',
            username: 'johntheedited'
        });
    });
})
    
