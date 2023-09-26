import "reflect-metadata"
import { BaseEntity, DataSource, EntityManager, EntityTarget, ObjectLiteral } from "typeorm"

export class Database {

    datasource: DataSource;

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
}