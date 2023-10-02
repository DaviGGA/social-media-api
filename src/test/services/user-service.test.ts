import "reflect-metadata"
import { expect, test, describe, beforeAll, afterAll, afterEach } from 'vitest';
import { User } from '../../entities/User';
import { TestDatabase } from "../../database/test-database";
import { UserService } from "../../services/user-service";
import { Repository } from "typeorm";

let db: TestDatabase;
let service: UserService;

beforeAll(async () => {
    db = new TestDatabase();
    service = new UserService(db);
    await db.connectDatabase();
})

afterAll(async () => {
    await db.disconnectDatabase();
})

afterEach( async () => {
    await db.clearTable(User);
})

test('Create user', async () => {
    let email: string = "johndoe@domain.com"
    let password: string = "Test1234!"
    const user: User = await service.createUser(email,password);

    const userRep: Repository<User> = db.manager.getRepository(User);

    const createdUser: User | null = await userRep.findOne({
        where: {id: user.id}
    })

    expect(user).toEqual(createdUser);

})

