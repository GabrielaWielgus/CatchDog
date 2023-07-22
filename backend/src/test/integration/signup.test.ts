import { before } from "node:test"
import { AppDataSource } from "../../database"
import { UserRepository } from "../../database/repositories/user.repository"
import * as bcrypt from "bcrypt"
import { SALT_ROUNDS } from "../../config"
import { SigninRequest } from "../../controllers/auth/signin"
import * as request from "supertest"
import { SignupRequest } from "../../controllers/auth/signup"

describe("POST /auth/signup", () => {
    beforeAll(async () => {
        await AppDataSource.initialize()
    })

    it("should sign up successfully", async () => {
        const data : SignupRequest = {
            email: "joedoe@gmail.com",
            password: "cisco",
            passwordRepeat: "cisco",
            firstName: "John",
            lastName: "Doe"
        }
        const response = await request(global.app).post("/auth/signup").send(data)
        expect(response.statusCode).toBe(201)
    })

    it("should not signin - user already exists", async () => {
        const data : SignupRequest = {
            email: "joedoe@gmail.com",
            password: "cisco",
            passwordRepeat: "cisco",
            firstName: "John",
            lastName: "Doe"
        }
        const response = await request(global.app).post("/auth/signup").send(data)
        expect(response.statusCode).toBe(400)
        expect(response.body.errors).toBeDefined()
    })
    
})