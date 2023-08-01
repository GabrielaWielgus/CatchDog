import { AppDataSource } from "../../../database"
import { SALT_ROUNDS } from "../../../config"
import * as bcrypt from "bcrypt"
import { faker } from "@faker-js/faker"
import * as jwt from "jsonwebtoken"
import { SECRET_KEY } from "../../../config/secret"
import * as request from "supertest"
import { UserRepository } from "../../../database/repositories/user.repository"
import { PostChatRequest } from "../../../controllers/chat/postChat"

describe("POST /chat", () => {
    beforeAll(async () => {
        await AppDataSource.initialize()
        
        // Create test users
        for(let i=0; i<6; i++){
            const user = UserRepository.create({
                email: faker.internet.email(),
                password: faker.internet.password(),
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName()
            })
            await UserRepository.save(user)
        }
    })

    it("should return authentication error if no token was attached", async () => {
        const response = await request(global.app).post("/chat").send({})
        expect(response.statusCode).toBe(401)
        expect(response.status).toBe(401)
    })

    it("should create chat between users with id 1 and 2", async () => {
        const data : PostChatRequest = {
            otherID: 2
        }
        const token = jwt.sign({userID: 1}, SECRET_KEY)
        const response = await request(global.app).post("/chat").set("Authorization", `Bearer ${token}`).send(data)

        expect(response.statusCode).toBe(201)
    })

    it("should create chat between users with id 1 and 3", async () => {
        const data : PostChatRequest = {
            otherID: 3
        }
        const token = jwt.sign({userID: 1}, SECRET_KEY)
        const response = await request(global.app).post("/chat").set("Authorization", `Bearer ${token}`).send(data)

        expect(response.statusCode).toBe(201)
    })

    it("should create chat between users with id 1 and 3", async () => {
        const data : PostChatRequest = {
            otherID: 1
        }
        const token = jwt.sign({userID: 4}, SECRET_KEY)
        const response = await request(global.app).post("/chat").set("Authorization", `Bearer ${token}`).send(data)

        expect(response.statusCode).toBe(201)
    })

    it("should not create another chat between users with id 1 and 2", async () => {
        const data : PostChatRequest = {
            otherID: 2
        }
        const token = jwt.sign({userID: 1}, SECRET_KEY)
        const response = await request(global.app).post("/chat").set("Authorization", `Bearer ${token}`).send(data)
        expect(response.statusCode).toBe(409)
    })

    it("should not create another chat between users with id 1 and 2", async () => {
        const data : PostChatRequest = {
            otherID: 1
        }
        const token = jwt.sign({userID: 4}, SECRET_KEY)
        const response = await request(global.app).post("/chat").set("Authorization", `Bearer ${token}`).send(data)
        expect(response.statusCode).toBe(409)
    })
})