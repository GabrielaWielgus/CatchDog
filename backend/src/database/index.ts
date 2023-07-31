import * as process from "process"
import { DataSource } from "typeorm"
import { User } from "./entities/User"
import {Walk} from "./entities/Walk"

export const AppDataSource = new DataSource({
    type: "sqlite",
    //host: "localhost",
    //port: 5432,
    //username: "test",
    //password: "test",
    database: process.env.NODE_ENV==="test" ? "./src/database/database.test.sqlite" : "./src/database/database.sqlite",
    synchronize: true,  // <-- DO NOT USE IN PRODUCTION
    logging: false,
    entities: [User, Walk], // <-- all entities have to be imported
    subscribers: [],
    migrations: [],
    dropSchema: true // <-- DO NOT USE IN PRODUCTION
})
