import { UserController } from "../controllers/user-controller";
import { Database } from "../database/database";
import express from "express";

export class UserRouter {
    public controller: UserController;
    public router: express.Router

    constructor(database: Database) {
        this.controller = new UserController(database);
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.postRoutes();
    }

    private postRoutes(): void {
        
        this.router.post('/',this.controller.createUser);
    }

}