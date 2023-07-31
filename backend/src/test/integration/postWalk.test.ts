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
import {DateTime} from "luxon"

describe("POST /walk", () => {
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

    it("should post walk for the user", async () => {
        const user = await UserRepository.findOneBy({email: "joedoe@gmail.com"})
        const token = jwt.sign({userID: user.id, email: user.email}, SECRET_KEY)
        
        const data : PostWalkRequest = {
            description: faker.lorem.sentence(),
            onLean: "yes",
            behavioralDisorder: "panic",
            started: DateTime.now().toISO(),
            ended: DateTime.now().plus({hour: 1}).toISO()
        }
        const response = await request(global.app).post("/walk").set("Authorization", `Bearer ${token}`).send(data)
        expect(response.statusCode).toBe(201)
    })

    it("should not post walk - missing authorization header", async () => {
        const data : PostWalkRequest = {
            description: faker.lorem.sentence(),
            onLean: "yes",
            behavioralDisorder: "panic",
            started: DateTime.now().toISO(),
            ended: DateTime.now().plus({hour: 1}).toISO()
        }
        const response = await request(global.app).post("/walk").send(data)
        expect(response.statusCode).toBe(401)
    })
})