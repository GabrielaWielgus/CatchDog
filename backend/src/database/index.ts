import * as process from "process"
import { DataSource } from "typeorm"
import { User } from "./entities/User"
import {Walk} from "./entities/Walk"
import { Message } from "./entities/chat/Message"
import { Chat } from "./entities/chat/Chat"
import { Chatter } from "./entities/chat/Chatter"
import { Dog } from "./entities/Dog"
import { DogTreatment } from "./entities/DogTreatment"
import { Treatment } from "./entities/Treatment"

export const AppDataSource = new DataSource({
    type: "sqlite",
    //host: "localhost",
    //port: 5432,
    //username: "test",
    //password: "test",
    database: process.env.NODE_ENV==="test" ? "./src/database/database.test.sqlite" : "./src/database/database.sqlite",
    synchronize: true,  // <-- DO NOT USE IN PRODUCTION
    logging: false,
    entities: [User, Walk, Chat, Chatter, Message, Dog, DogTreatment, Treatment], // <-- all entities have to be imported
    subscribers: [],
    migrations: [],
    dropSchema: false // <-- SET TO FALSE IN PRODUCTION
})
