import express from "express";
import { Database } from "./database";

export class App {
    public server: express.Application;

    constructor() {
        this.server = express();
        this.middleware();
        this.connectDatabase();       
    }

    private middleware(): void {
        this.server.use(express.json());
    }

    private connectDatabase(): void {
        new Database();
    }

    // ROUTER
}