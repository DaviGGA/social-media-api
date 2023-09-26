import "reflect-metadata"
import { App } from "./app";
import { Database } from "./database";

const app: App = new App();
app.server.listen(3001);

const db: Database = new Database();
db.connectDatabase();