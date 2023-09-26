import "reflect-metadata"
import { DataSource, EntityManager } from "typeorm"
import { User } from "./entities/User"

export class Database {

    public datasource: DataSource = new DataSource({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "postgres",
        database: "redesocial",
        synchronize: true,
        logging: true,
        entities: [User],
        subscribers: [],
        migrations: [],
    })
    
    connectDatabase(): void {
        this.datasource.initialize().then(async () => {
            console.log("Succesfully connected to database");          
        }).catch(error => console.log(error));
    }

    disconnectDatabase(): void {
        this.datasource.destroy();
    }

    get manager(): EntityManager {
        return this.datasource.manager;
    }
}
