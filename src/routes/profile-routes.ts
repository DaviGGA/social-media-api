import { ProfileController } from "../controllers/profile-controller";
import { Database } from "../database/database";
import express from "express";
import { Router } from "express";

export class ProfileRouter {
    public controller: ProfileController;
    public router: Router;

    constructor(database: Database) {
        this.controller = new ProfileController(database);
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/', this.controller.createProfile);
        this.router.put('/:profileId', this.controller.updateProfile);
        this.router.get('/:profileId', this.controller.getProfile);
        this.router.get('/', this.controller.getAllProfiles);
    }
}