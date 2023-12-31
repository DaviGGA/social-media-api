import { Database } from "../database/database";
import { Profile } from "../entities/Profile";
import { User } from "../entities/User";

export class ProfileService {
    private database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    public async createProfile(profile: Profile): Promise<Profile> {
        return this.database.manager.save(profile);
    }

    public async updateProfile(profile: Profile): Promise<Profile> { 
        return this.database.manager.save(profile);
    }

    public async getProfile(profileId: number): Promise<Profile | null> {
        return this.database.manager.findOne(Profile,{
            where: {id: profileId}
        })
    }

    public async getAllProfiles(): Promise<Profile[]> {
        return this.database.manager.find(Profile)
    }


}