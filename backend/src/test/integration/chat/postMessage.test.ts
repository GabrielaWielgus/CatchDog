import { AppDataSource } from "../../../database"
import { faker } from "@faker-js/faker"
import * as jwt from "jsonwebtoken"
import { SECRET_KEY } from "../../../config/secret"
import * as request from "supertest"
import { UserRepository } from "../../../database/repositories/user.repository"
import { PostChatRequest } from "../../../controllers/chat/postChat"
import { seedUser } from "../../../database/seeders/user.seeder"
import { seedChat } from "../../../database/seeders/chat.seeder"
import { ChatRepository } from "../../../database/repositories/chat.repository"
import { PostMessageRequest } from "../../../controllers/chat/message/postMessage"
import { Chat } from "../../../database/entities/chat/Chat"

describe("POST /chat", () => {
    beforeAll(async () => {
        await AppDataSource.initialize()
        
        await seedUser()
        await seedChat()
    })

    it("should return authentication error if no token was attached", async () => {
        const response = await request(global.app).post("/chat/message").send({})
        expect(response.statusCode).toBe(401)
        expect(response.status).toBe(401)
    })

    it("should create new message for chat", async () => {
        // Same as below
        //const chats = await ChatRepository.createQueryBuilder("chat")
        //.leftJoinAndSelect("chat.chatters", "chatter")
        //.leftJoinAndSelect("chatter.user", "user")
        //.getMany()

        const chats = await ChatRepository.find({
            relations: {
                chatters: {
                    user: true
                }
            }
        })
        
        const chat = chats[0]
        const user = chat.chatters[0].user
        const token = jwt.sign({userID: user.id}, SECRET_KEY)

        const data : PostMessageRequest = {
            chatID: chat.id,
            text: faker.lorem.sentence()
        }
        const response = await request(global.app).post("/chat/message").set("Authorization", `Bearer ${token}`).send(data)
        expect(response.status).toBe(201)
    })
})