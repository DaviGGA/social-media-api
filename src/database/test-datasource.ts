import { DataSource } from "typeorm"
import { User } from "../entities/User"
import { Profile } from "../entities/Profile"

let testDatasource: DataSource =  new DataSource({
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

export default  testDatasource;