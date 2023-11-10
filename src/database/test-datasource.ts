import { DataSource } from "typeorm"
import { User } from "../entities/User"
import { Profile } from "../entities/Profile"
import { Post } from "../entities/Post";

let testDatasource: DataSource =  new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "test_redesocial",
    synchronize: true,
    logging: false,
    entities: [User,Profile,Post],
    subscribers: [],
    migrations: [],
})

export default  testDatasource;