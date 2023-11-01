import "reflect-metadata"
import { BaseEntity, DataSource, EntityManager, EntityTarget, ObjectLiteral, Repository } from "typeorm"

export class Database {

    datasource: DataSource;


    public setDatasource(datasource: DataSource) {
        this.datasource = datasource;
    }

    public async connectDatabase(): Promise<void> {        
        await this.datasource.initialize().then(async () => {
            console.log("Succesfully connected to database");          
        }).catch(error => console.log(error));
    }

    public async disconnectDatabase(): Promise<void> {
        await this.datasource.destroy();
        console.log("Succesfully destroyed database");
    }

    get manager(): EntityManager {
        return this.datasource.manager;
    }

    public async clearTable(Entity: EntityTarget<ObjectLiteral>): Promise<void> {
        let repository: Repository<ObjectLiteral> = this.manager.getRepository(Entity);
        let records: ObjectLiteral[] = await repository.find();
        await repository.remove(records);
    }
}