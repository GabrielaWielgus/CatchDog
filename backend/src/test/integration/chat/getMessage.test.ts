import { AppDataSource } from "../../../database"
import * as jwt from "jsonwebtoken"
import { SECRET_KEY } from "../../../config/secret"
import * as request from "supertest"
import { seedUser } from "../../../database/seeders/user.seeder"
import { seedChat } from "../../../database/seeders/chat.seeder"
import { ChatRepository } from "../../../database/repositories/chat.repository"
import { seedMessages } from "../../../database/seeders/message.seeder"
import { GetMessageRequest } from "../../../controllers/chat/message/getMessage"

describe("POST /chat", () => {
    beforeAll(async () => {
        await AppDataSource.initialize()
        
        await seedUser()
        await seedChat()
        await seedMessages()
    })

    it("should return authentication error if no token was attached", async () => {
        const response = await request(global.app).post("/chat/message").send({})
        expect(response.statusCode).toBe(401)
        expect(response.status).toBe(401)
    })

    it("should fetch a list of messages", async () => {
        const chats = await ChatRepository.find({
            relations: { chatters: { user: true } }
        })
        const chat = chats[0]
        const user = chat.chatters[0].user
        const token = jwt.sign({userID: user.id}, SECRET_KEY)

        const params : GetMessageRequest = {
            chatID: chat.id,
            skip: 1,
            limit: 5
        }

        const response = await request(global.app).get("/chat/message").set("Authorization", `Bearer ${token}`).query(params).send()
        expect(response.status).toBe(200)
        expect(response.body.messages).toBeDefined()
        expect(response.body.messages.length).toBe(10)
    })

    it("should return forbidden error - user not authorized to read chat", async () => {
        const chats = await ChatRepository.find({
            relations: { chatters: { user: true } }
        })
        const chat = chats[0]
        const token = jwt.sign({userID: 999}, SECRET_KEY)

        const params : GetMessageRequest = {
            chatID: chat.id,
            skip: 1,
            limit: 10
        }
        const response = await request(global.app).get("/chat/message").set("Authorization", `Bearer ${token}`).query(params).send()

        expect(response.status).toBe(403)
    })
})