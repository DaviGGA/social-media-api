import { Database } from "../database/database";
import { Profile } from "../entities/Profile";

export class PostService {
    private database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    public async createProfile(profile: Profile): Promise<Profile> {
        return this.database.manager.save(profile);
    }

}