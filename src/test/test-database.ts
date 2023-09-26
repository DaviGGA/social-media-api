import "reflect-metadata"
import { DataSource, EntityManager } from "typeorm"
import { User } from "../entities/User"

export class TestDatabase {

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

    public async connectDatabase(): Promise<void> {        
        await this.datasource.initialize().then(async () => {
            console.log("Succesfully connected to test database");          
        }).catch(error => console.log(error));
    }

    public async disconnectDatabase(): Promise<void> {
        await this.datasource.destroy();
        console.log("Succesfully destroyed test database");
    }

    get manager(): EntityManager {
        return this.datasource.manager
    }


    
}




