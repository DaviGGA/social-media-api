import { DataSource } from "typeorm"
import { User } from "../entities/User"
import { Profile } from "../entities/Profile"
import { Post } from "../entities/Post";

let datasource: DataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "redesocial",
    synchronize: true,
    logging: false,
    entities: [User,Profile,Post],
    subscribers: [],
    migrations: [],
})

export default datasource;