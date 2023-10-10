import { ProfileController } from "../controllers/profile-controller";
import { Database } from "../database/database";
import express from "express";
import { Router } from "express";
import multer, { Multer } from "multer";

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
        this.router.post('/', this.upload.single('image'), this.controller.createProfile);
        this.router.put('/:profileId', this.controller.updateProfile);
        this.router.get('/:profileId', this.controller.getProfile);
        this.router.get('/', this.controller.getAllProfiles);
    }
}