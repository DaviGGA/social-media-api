import { ProfileController } from "../controllers/profile-controller";
import { Database } from "../database/database";
import express from "express";
import { Router } from "express";
import multer, { Multer } from "multer";
import { Authenticate } from "../middlewares/authenticate";

export class ProfileRouter {
    public controller: ProfileController;
    public router: Router;
    public upload: Multer = multer({dest: 'uploads/profile'})

    constructor(database: Database) {
        this.controller = new ProfileController(database);
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            '/', 
            Authenticate.middleware ,
            this.upload.single('image'), 
            this.controller.createProfile
        );
        this.router.put(
            '/:profileId',
            Authenticate.middleware , 
            this.controller.updateProfile
        );
        this.router.get(
            '/:profileId',
            Authenticate.middleware ,
            this.controller.getProfile
        );
        this.router.get(
            '/',
            Authenticate.middleware, 
            this.controller.getAllProfiles
        );
    }
}