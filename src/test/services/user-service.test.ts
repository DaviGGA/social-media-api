import "reflect-metadata"
import { expect, test, describe, beforeAll, afterAll, afterEach } from 'vitest';
import { User } from '../../entities/User';
import { UserService } from "../../services/user-service";
import { Repository } from "typeorm";
import { Database } from "../../database/database";
import testDatasource from "../../database/test-datasource";
import app from "../..";

let db: Database;
let service: UserService;

beforeAll(async () => {
    db = new Database();
    db.setDatasource(testDatasource);
    app.setDatabase(db);

    service = new UserService(db);
   
    await app.database.connectDatabase();

    await app.database.clearTable(User);
})

afterAll(async () => {
    await app.database.disconnectDatabase();
})

afterEach( async () => {
    await app.database.clearTable(User);
})

test('Create user', async () => {
    let user: User = new User();
    user.email = 'johndoe@domain.com'
    user.password = 'Test1234!'

    let newUser: User = await service.createUser(user);

    const userRep: Repository<User> = app.database.manager.getRepository(User);

    const createdUser: User | null = await userRep.findOne({
        where: {id: newUser.id}
    })

    expect(newUser).toEqual(createdUser);

})

