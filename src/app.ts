import "reflect-metadata"
import express from "express";
import multer from "multer";
require('express-async-errors');
import { UserRouter } from "./routes/user-route";
import { Database } from "./database/database";
import { ErrorHandler } from "./middlewares/error-handler";
import { ProfileRouter } from "./routes/profile-routes";
import { EntityManager } from "typeorm";

export class App {
    public server: express.Application;
    public database: Database;
    
    public async start(port: number) {
        this.server = express();
        this.server.use(express.json());
        this.routes();    
        this.middleware();
        
        await this.database.connectDatabase();

        this.server.listen(port, () => {
            console.log("Server connected at port " + port)
        });
    }

    public async test() {
        this.server = express();
        this.server.use(express.json());
        this.routes();    
        this.middleware();
    }


    private middleware(): void {
        this.server.use(ErrorHandler.middleware);
    }

    private routes(): void {
        this.server.use('/user', new UserRouter(this.database).router);
        this.server.use('/profile', new ProfileRouter(this.database).router);
    }

    public setDatabase(database: Database) {
        this.database = database;
    }

    // ROUTER
}