import { AppDataSource } from "./data-source"

export class Database {
    constructor() {
        AppDataSource.initialize().then(async () => {
            console.log("Succesfully connected to database");          
        }).catch(error => console.log(error));
    }
}
