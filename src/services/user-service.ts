import { Database } from "../database/database";
import { User } from "../entities/User";

export class UserService {

    private database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    public async createUser(user: User): Promise<User> {        
        return await this.database.manager.save(user);
    }



}