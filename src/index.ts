import "reflect-metadata"
import { App } from "./app";
import { AppDatabase } from "./database/app-database";

const app: App = new App();
app.server.listen(3001);

const db: AppDatabase = new AppDatabase();
db.connectDatabase();