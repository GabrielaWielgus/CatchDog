import { before } from "node:test"
import { AppDataSource } from "../../database"
import { UserRepository } from "../../database/repositories/user.repository"
import * as bcrypt from "bcrypt"
import { SALT_ROUNDS } from "../../config"
import { SigninRequest } from "../../controllers/auth/signin"
import * as request from "supertest"

describe("POST /auth/signin", () => {
    beforeAll(async () => {
        await AppDataSource.initialize()

        const user = UserRepository.create({
            email: "joedoe@gmail.com",
            password: await bcrypt.hash("cisco", SALT_ROUNDS),
            firstName: "Joe",
            lastName: "Doe"
        })
        await UserRepository.save(user)
    })

    it("should sign in successfully", async () => {
        const data : SigninRequest = {
            email: "joedoe@gmail.com",
            password: "cisco"
        }
        const response = await request(global.app).post("/auth/signin").send(data)
        expect(response.statusCode).toBe(200)
        expect(response.body.accessToken).toBeDefined()
        expect(response.body.refreshToken).toBeDefined()
        expect(typeof response.body.accessToken).toBe("string")
    })

    it("should not signin - wrong email", async () => {
        const data : SigninRequest = {
            email: "notexisting@gmail.com",
            password: "cisco"
        }
        const response = await request(global.app).post("/auth/signin").send(data)
        expect(response.statusCode).toBe(400)
        expect(response.body.message).toBeDefined()
        expect(response.body.errors).toBe(undefined)
    })
})