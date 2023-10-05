import "reflect-metadata"
import { App } from "./app";
import { AppDatabase } from "./database/app-database";

const db: AppDatabase = new AppDatabase();
const app: App = new App(db);

app.init(3001);
