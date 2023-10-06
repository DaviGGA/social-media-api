import "reflect-metadata"
import express from "express";
require('express-async-errors');
import { UserRouter } from "./routes/user-route";
import { Database } from "./database/database";
import { ErrorHandler } from "./middlewares/error-handler";

export class App {
    public server: express.Application;
    private database: Database;

    constructor(database: Database) {
        this.server = express();
        this.database = database;
        this.server.use(express.json());
        this.routes();    
        this.middleware();
    }

    private middleware(): void {
        this.server.use(ErrorHandler.middleware);
    }

    private routes(): void {
        this.server.use('/user', new UserRouter(this.database).router)
    }

 

    // ROUTER
}