import { expect, test, describe, beforeAll, afterAll, afterEach } from 'vitest';
const request = require('supertest');
import { User } from '../../entities/User';
import { Request, Response } from "supertest";
import testDatasource from '../../database/test-datasource';
import { Database } from '../../database/database';
import app from '../../index';



beforeAll(async () => {   
    const db: Database = new Database();
    db.setDatasource(testDatasource);

    app.setDatabase(db);
    app.test();
    
    await app.database.connectDatabase();
    
    await app.database.clearTable(User);
})

afterEach( async () => {
    await app.database.clearTable(User);
})

afterAll(async () => {
    await app.database.disconnectDatabase();    
})



describe("POST requests", () => {

    test("/user/", async () => {

        let res: Response = await request(app.server)
        .post('/user')
        .send({
            email:"johndoe2@domain.com",
            password:"Test1234!",
            confirmPassword:"Test1234!"
        })

        expect(res.statusCode).toBe(201);
        expect(res.body.data).toMatchObject({
            email:"johndoe2@domain.com",
        })       
    })
})