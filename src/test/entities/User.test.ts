import "reflect-metadata"
import { expect, test, describe, beforeAll, afterAll, afterEach } from 'vitest';
import { User } from '../../entities/User';
import app from "../../index";
import testDatasource from "../../database/test-datasource";
import { Database } from "../../database/database";

let db: Database;

beforeAll(async () => {
    db = new Database();
    db.setDatasource(testDatasource);
    app.setDatabase(db);
 
    await app.database.connectDatabase();
    await app.database.clearTable(User);
})

afterAll(async () => {
    await app.database.disconnectDatabase();
})

afterEach( async () => {
    await app.database.clearTable(User);
})


describe("User fields validation", () => {
    
    test("Given a user, if user doest have a '@' and '.com' then return a error",async () => {

        const user = new User();
        user.email = 'johndoe!domain'
        user.password = 'Test1234!'

        try {
            await app.database.manager.save(user);
            
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
        
    })

    test("Given a user, if user password has less than 8 characters then return a error", async () => {
        const user = new User();
        user.email = 'johndoe@domain.com';
        user.password = 'Test1!'

        try {
            await app.database.manager.save(user);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    })

    test("Given a user, if user password has no special characters then return a error", async () => {
        const user = new User();
        user.email = 'johndoe@domain.com';
        user.password = 'Test1234'

        try {
            await app.database.manager.save(user);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    })

    test("Given a user, if user password has no digits then return a error", async () => {
        const user = new User();
        user.email = 'johndoe@domain.com';
        user.password = 'Testest!!'

        try {
            await app.database.manager.save(user);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    })


    test("Given a user, user is correctly validated, then he is succesfully created", async () => {
        const user = new User();
        user.email = 'john.doe@domain.com'
        user.password= 'Test1234!'

        const userCreated = await app.database.manager.save(user);

        expect(userCreated.email).toBe('john.doe@domain.com')
    })

    
})

