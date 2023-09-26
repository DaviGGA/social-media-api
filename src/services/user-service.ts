import { Database } from "../database/database";
import { User } from "../entities/User";

export class UserService {

    private database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    public async createUser(email: string, password: string): Promise<User> {        
        const user: User = new User();
        user.email = email;
        user.password = password;

        return await this.database.manager.save(user);
    }



}