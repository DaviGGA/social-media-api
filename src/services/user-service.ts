import { Database } from "../database/database";
import { User } from "../entities/User";
import { FindOneOptions } from 'typeorm';

export class UserService {

    private database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    public async createUser(user: User): Promise<User> {        
        return this.database.manager.save(user);
    }

    public async findUserByEmail(email: string): Promise<User | null>  {
        return this.database.manager.findOne(User, {
            where: {email: email as any}
        })
    }
}