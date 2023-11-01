import { DataSource } from "typeorm"
import { User } from "../entities/User"
import { Profile } from "../entities/Profile"

let datasource: DataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "redesocial",
    synchronize: true,
    logging: false,
    entities: [User,Profile],
    subscribers: [],
    migrations: [],
})

export default datasource;