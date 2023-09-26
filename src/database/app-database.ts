import "reflect-metadata"
import { DataSource, EntityManager } from "typeorm"
import { User } from "../entities/User"
import { Database } from "./database"

export class AppDatabase extends Database {

    public datasource: DataSource = new DataSource({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "postgres",
        database: "redesocial",
        synchronize: true,
        logging: false,
        entities: [User],
        subscribers: [],
        migrations: [],
    })
    
    
}
