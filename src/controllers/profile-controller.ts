import { Database } from "../database/database";
import { Request, Response, NextFunction } from 'express';
import { Profile } from "../entities/Profile";
import { ProfileService } from "../services/profile-service";
import { NotFoundError } from "../errors/api-error";
import { log } from "console";

export class ProfileController {
    service: ProfileService

    constructor(database: Database) {
        this.service = new ProfileService(database);
    }

    public createProfile = async (req: Request,res: Response, next: NextFunction): Promise<void> => {
        let {
            name,
            surname,
            username,
        } = req.body

        let image = req.file;

        let profile: Profile = new Profile();
        profile.name = name;
        profile.surname = surname;
        profile.username = username;
        
        if (image) {
            profile.image = image.filename;
        } 
        
        let newProfile: Profile = await this.service.createProfile(profile);
        
        res.status(201).send({
            message: "Profile successfully created!",
            data: newProfile
        })
    }

    public updateProfile =  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let {
            name,
            surname,
            username,
        } = req.body 

        let  profileId: number = parseInt(req.params.profileId);

        let profile: Profile | null = await this.service.getProfile(profileId);

        if (profile == null) {
            throw new NotFoundError("This profile does not exists.")
        }

        profile.name = name ?? profile.name;
        profile.surname = surname ?? profile.surname;
        profile.username = username ?? profile.username;

        let updatedProfile: Profile = await this.service.updateProfile(profile);

        res.status(200).send({
            message: "Profile sucessfully updated!",
            data: updatedProfile
        })

    }

    public getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let profileId: number = parseInt(req.params.profileId);

        let profile: Profile | null = await this.service.getProfile(profileId);

        if (profile == null) {
            throw new NotFoundError("This profile does not exists.")
        }

        res.status(200).send({
            data: profile
        })
        
    }

    public getAllProfiles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let profiles: Profile[] = await this.service.getAllProfiles();

        res.status(200).send({
            data: profiles
        })
        
    }
    
}