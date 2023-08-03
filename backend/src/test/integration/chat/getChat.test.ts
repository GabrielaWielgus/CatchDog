import { AppDataSource } from "../../../database"
import { SALT_ROUNDS } from "../../../config"
import * as bcrypt from "bcrypt"
import { faker } from "@faker-js/faker"
import * as jwt from "jsonwebtoken"
import { SECRET_KEY } from "../../../config/secret"
import * as request from "supertest"
import { UserRepository } from "../../../database/repositories/user.repository"
import { PostChatRequest } from "../../../controllers/chat/postChat"
import { GetChatResponse } from "../../../controllers/chat/getChat"
import { ChatRepository } from "../../../database/repositories/chat.repository"

import { seedUser } from "../../../database/seeders/user.seeder"
import { seedChat } from "../../../database/seeders/chat.seeder"
import { seedMessages } from "../../../database/seeders/message.seeder"

describe("POST /chat", () => {
    beforeAll(async () => {
        await AppDataSource.initialize()
        
        await seedUser()
        await seedChat()
        await seedMessages()
    })

    it("should return authentication error if no token was attached", async () => {
        const response = await request(global.app).get("/chat").send({})
        expect(response.statusCode).toBe(401)
        expect(response.status).toBe(401)
    })

    it("should return list of chats for joe", async () => {
        const joe = await UserRepository.findOneBy({email: "Joedoe@gmail.com"})
        const token = jwt.sign({userID: joe.id}, SECRET_KEY)
        const response = await request(global.app).get("/chat").set("Authorization", `Bearer ${token}`).send()
    
        expect(response.status).toBe(200)
        const data = response.body as GetChatResponse
        console.log(data.chats[0].chatters)
        console.log(data.chats[0].messages)
        expect(data.chats.length).toBeGreaterThan(0)
    })
})