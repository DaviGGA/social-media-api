import { Database } from "../database/database";
import express from "express";
import { Router } from "express";
import multer, { Multer } from "multer";
import { Authenticate } from "../middlewares/authenticate";
import { PostController } from "../controllers/post-controller";

export class ProfileRouter {
    public controller: PostController;
    public router: Router;
    public upload: Multer = multer({dest: 'uploads/post'})

    constructor(database: Database) {
        this.controller = new PostController(database);
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            '/', 
            Authenticate.middleware ,
            this.upload.single('image'), 
            this.controller.createPost
        );
    }
}