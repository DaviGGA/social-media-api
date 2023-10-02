import "reflect-metadata"
import express from "express";
import { UserRouter } from "./routes/user-route";
import { Database } from "./database/database";

export class App {
    public server: express.Application;
    private database: Database;

    constructor(database: Database) {
        this.server = express();
        this.database = database;
        this.middleware();
        this.routes();    
    }

    private middleware(): void {
        this.server.use(express.json());
    }

    private routes(): void {
        this.server.use('/user', new UserRouter(this.database).router)
    }
    

    // ROUTER
}