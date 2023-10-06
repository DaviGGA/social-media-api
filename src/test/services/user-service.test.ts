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
    let user: User = new User();
    user.email = 'johndoe@domain.com'
    user.password = 'Test1234!'

    let newUser: User = await service.createUser(user);

    const userRep: Repository<User> = db.manager.getRepository(User);

    const createdUser: User | null = await userRep.findOne({
        where: {id: newUser.id}
    })

    expect(newUser).toEqual(createdUser);

})

