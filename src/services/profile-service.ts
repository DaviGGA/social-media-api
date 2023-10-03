import { Database } from "../database/database";
import { Profile } from "../entities/Profile";
import { User } from "../entities/User";

export class ProfileService {
    private database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    public async createProfile(name: string, surname: string, username: string): Promise<Profile> {
        const profile: Profile = new Profile();
        profile.name = name;
        profile.surname = surname;
        profile.username = username;
     
        return this.database.manager.save(profile);
    }

    public async updateProfile(profileId:number,name:string, 
    surname: string, username: string): Promise<Profile | null>  { 
        const profile: Profile | null = await this.database.manager.findOne(Profile, {
            where: {id: profileId}
        })

        if (profile) {
            profile.name = name ? name : profile.name;
            profile.surname = surname ? surname : profile.surname;
            profile.username = username ? username : profile.username;

            return this.database.manager.save(profile);
        } else {
            return null
        }
    }


}