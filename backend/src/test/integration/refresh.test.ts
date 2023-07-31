import { before } from "node:test"
import { AppDataSource } from "../../database"
import { UserRepository } from "../../database/repositories/user.repository"
import * as bcrypt from "bcrypt"
import { SALT_ROUNDS } from "../../config"
import { SigninRequest } from "../../controllers/auth/signin"
import * as request from "supertest"
import { seedUser } from "../../database/seeders/user.seeder"
import * as jwt from "jsonwebtoken"
import { SECRET_KEY } from "../../config/secret"
import { PostWalkRequest } from "../../controllers/walk/postWalk"
import { faker } from "@faker-js/faker"
import { JWTPayload } from "../../controllers/auth/signin"

describe("POST /walk", () => {
    beforeAll(async () => {
        await AppDataSource.initialize()

        await UserRepository.save(UserRepository.create({
            email: "joedoe@gmail.com",
            password: await bcrypt.hash("cisco", SALT_ROUNDS),
            firstName: "Joe",
            lastName: "Doe"
        }))
    })

    it("should refresh token successfully", async () => {
        const payload : JWTPayload = {
            userID: 1,
            email: "joedoe@gmail.com"
        }
        const refreshToken = jwt.sign(payload, SECRET_KEY)
        const response = await request(global.app).post("/auth/refresh").send({
            refreshToken: refreshToken
        })
        expect(response.status).toBe(200)
        expect(response.body.accessToken).toBeDefined()
    })

    it("should not refresh token - refresh token invalid", async () => {
        const payload : JWTPayload = {
            userID: 1,
            email: "joedoe@gmail.com"
        }
        const refreshToken = jwt.sign(payload, SECRET_KEY) + "invalidatingSuffix"
        const response = await request(global.app).post("/auth/refresh").send({
            refreshToken: refreshToken
        })
        expect(response.status).toBe(401)
    })

    it("should not refresh token - missing body", async () => {
        const payload : JWTPayload = {
            userID: 1,
            email: "joedoe@gmail.com"
        }
        const refreshToken = jwt.sign(payload, SECRET_KEY) 
        const response = await request(global.app).post("/auth/refresh").send({
            // empty body
        })
        expect(response.status).toBe(401)
    })
})