import "reflect-metadata"
import { BaseEntity, DataSource, EntityManager, EntityTarget, ObjectLiteral } from "typeorm"
import { User } from "../entities/User"
import { Database } from "./database";

export class TestDatabase extends Database {

    public datasource: DataSource =  new DataSource({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "postgres",
        database: "test_redesocial",
        synchronize: true,
        logging: false,
        dropSchema:true,
        entities: [User],
        subscribers: [],
        migrations: [],
    })

    public async clearTable(Entity: EntityTarget<ObjectLiteral>): Promise<void> {
        await this.manager.getRepository(Entity).clear();
    }
    
}




