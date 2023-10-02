import "reflect-metadata"
import { BaseEntity, DataSource, EntityManager, EntityTarget, ObjectLiteral, Repository } from "typeorm"
import { User } from "../entities/User"
import { Profile } from "../entities/Profile"

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
        entities: [User,Profile],
        subscribers: [],
        migrations: [],
    })

    public async clearTable(Entity: EntityTarget<ObjectLiteral>): Promise<void> {
        let repository: Repository<ObjectLiteral> = this.manager.getRepository(Entity);
        let records: ObjectLiteral[] = await repository.find();
        await repository.remove(records);

    }
    
}




