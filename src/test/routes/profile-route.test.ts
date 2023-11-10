import { expect, test, describe, beforeAll, afterAll, afterEach } from 'vitest';
const request = require('supertest');
import { Profile } from "../../entities/Profile";
import { Request, Response } from "supertest";
import jwt from "jsonwebtoken";
import { Repository } from "typeorm";
import { User } from "../../entities/User";
import app from "../../index";
import testDatasource from "../../database/test-datasource";
import { Database } from "../../database/database";


let token: string;

let userData: Partial<User> = {
    email: 'johndoe.profile@domain.com',
    password: 'Test1234!'
}

async function getToken(): Promise<string> {
    let userRep: Repository<User> = app.database.manager.getRepository(User);
    let user = await userRep.save(userData);

    const signedToken = jwt.sign(
        {
            id: user.id, 
            email: user.email
        }, 
        process.env.JWT_SECRET_KEY ?? '',
        {expiresIn: 15000}
    )

    return signedToken
}

beforeAll(async () => {   
    const db: Database = new Database();
    db.setDatasource(testDatasource);

    app.setDatabase(db);
    app.test();
    
    await app.database.connectDatabase();

    await app.database.clearTable(User);
    await app.database.clearTable(Profile);
    
    token = await getToken();
});

afterEach( async () => {
    await app.database.clearTable(Profile);
})

afterAll(async () => {
    await app.database.clearTable(User); 
    await app.database.disconnectDatabase();
})

describe("Profile POST requests", () => {
    test("/profile/", async () => {
        let res: Response = await request(app.server)
        .post('/profile/')
        .send({
            name: 'John',
            surname: 'Doe',
            username: 'johnthecool'
        })
        .set({ 'Authorization': `Bearer ${token}` });
        
        expect(res.statusCode).toBe(201)
        expect(res.body.data).toMatchObject({
            name: 'John',
            surname: 'Doe',
            username: 'johnthecool'
        });
    });
})

describe("Profile PUT requests", () => {
    test("/profile/:profileId", async () => {
        let profile: Profile = new Profile();
        profile.name = 'John';
        profile.surname = 'Doe';
        profile.username = 'johnthecool';

        let newProfile: Profile = await app.database.manager.save(Profile,profile);

        let res: Response = await request(app.server)
        .put(`/profile/${newProfile.id}`)
        .send({
            name: 'John edited',
            surname: 'Doe edited',
            username: 'johntheedited',
        })
        .set({ 'Authorization': `Bearer ${token}` });
        
        expect(res.statusCode).toBe(200)
        expect(res.body.data).toMatchObject({
            name: 'John edited',
            surname: 'Doe edited',
            username: 'johntheedited'
        });
    });
})

describe("Profile GET requests", () => {
    test("/profile/:profileId", async () => {
        let profile: Profile = new Profile();
        profile.name = 'John';
        profile.surname = 'Doe';
        profile.username = 'johnthecool';

        let newProfile: Profile = await app.database.manager.save(Profile,profile);

        let res: Response = await request(app.server)
        .get(`/profile/${newProfile.id}`)
        .set({ 'Authorization': `Bearer ${token}` });
        expect(res.statusCode).toBe(200)
        expect(res.body.data).toMatchObject({
            name: 'John',
            surname: 'Doe',
            username: 'johnthecool'
        })
    })

    test("/profile/", async () => {
        let profile: Profile = new Profile();
        profile.name = 'John';
        profile.surname = 'Doe';
        profile.username = 'johnthecool';
        
        let newProfile: Profile = await app.database.manager.save(Profile,profile);

        let res: Response = await request(app.server)
        .get(`/profile/${newProfile.id}`)
        .set({ 'Authorization': `Bearer ${token}` });
        
        expect(res.statusCode).toBe(200)
        expect(res.body.data).toContain({
            name: 'John',
            surname: 'Doe',
            username: 'johnthecool'
        })

    })
})
    
