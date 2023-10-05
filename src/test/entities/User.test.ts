import "reflect-metadata"
import { expect, test, describe, beforeAll, afterAll, afterEach } from 'vitest';
import { User } from '../../entities/User';
import { TestDatabase } from '../../database/test-database';

let db: TestDatabase;

beforeAll(async () => {
    db  = new TestDatabase();
    await db.connectDatabase();
})

afterAll(async () => {
    await db.disconnectDatabase();
})

afterEach( async () => {
    await db.clearTable(User);
})


describe("User fields validation", () => {
    
    test("Given a user, if user doest have a '@' and '.com' then return a error",async () => {

        const user = new User();
        user.email = 'johndoe!domain'
        user.password = 'Test1234!'

        try {
            await db.manager.save(user);
            
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
        
    })

    test("Given a user, if user password has less than 8 characters then return a error", async () => {
        const user = new User();
        user.email = 'johndoe@domain.com';
        user.password = 'Test1!'

        try {
            await db.manager.save(user);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    })

    test("Given a user, if user password has no special characters then return a error", async () => {
        const user = new User();
        user.email = 'johndoe@domain.com';
        user.password = 'Test1234'

        try {
            await db.manager.save(user);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    })

    test("Given a user, if user password has no digits then return a error", async () => {
        const user = new User();
        user.email = 'johndoe@domain.com';
        user.password = 'Testest!!'

        try {
            await db.manager.save(user);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    })


    test("Given a user, user is correctly validated, then he is succesfully created", async () => {
        const user = new User();
        user.email = 'johndoe@domain.com'
        user.password= 'Test1234!'

        const userCreated = await db.manager.save(user);

        expect(userCreated.email).toBe('johndoe@domain.com')
    })

    
})

