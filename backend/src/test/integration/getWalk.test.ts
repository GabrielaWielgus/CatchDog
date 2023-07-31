import { before } from "node:test"
import { AppDataSource } from "../../database"
import { UserRepository } from "../../database/repositories/user.repository"
import * as bcrypt from "bcrypt"
import { SALT_ROUNDS } from "../../config"
import { SigninRequest } from "../../controllers/auth/signin"
import * as request from "supertest"
import * as jwt from "jsonwebtoken"
import { SECRET_KEY } from "../../config/secret"
import { PostWalkRequest } from "../../controllers/walk/postWalk"
import { faker } from "@faker-js/faker"
import {DateTime} from "luxon"
import { seedUser } from "../../database/seeders/user.seeder"
import { seedWalks } from "../../database/seeders/walk.seeder"
import { WalkRepository } from "../../database/repositories/walk.repository"

describe("GET /walk", () => {
    beforeAll(async () => {
        await AppDataSource.initialize()

        // Create user
        const joe = await UserRepository.save(UserRepository.create({
            email: "joedoe@gmail.com",
            password: await bcrypt.hash("cisco", SALT_ROUNDS),
            firstName: "Joe",
            lastName: "Doe"
        }))
        const moe = await UserRepository.save(UserRepository.create({
            email: "moedoe@gmail.com",
            password: await bcrypt.hash("cisco", SALT_ROUNDS),
            firstName: "Moe",
            lastName: "Doe"
        }))

        // Create 5 walks for the joe user
        for(let i=0; i<5; i++){
            const walk = WalkRepository.create({
                description: faker.lorem.sentence({min: 10, max:20}),
                onLean: ["yes", "no"][Math.floor(Math.random()*2)],
                behavioralDisorder: faker.lorem.word(),
                started: faker.date.past(),
                ended: faker.date.soon(),
                user: joe
            })
            await WalkRepository.save(walk)
        }
    })

    it("should get a list of 5 walks for joe", async () => {
        const token = jwt.sign({userID: 1}, SECRET_KEY)
        const response = await request(global.app).get("/walk").set("Authorization", `Bearer ${token}`).send()
        expect(response.statusCode).toBe(200)
        expect(response.body.walks).toBeDefined()
        expect(response.body.walks.length).toBe(5)
    })

    it("should get an empty list of walks for moe", async () => {
        const token = jwt.sign({userID: 2}, SECRET_KEY)
        const response = await request(global.app).get("/walk").set("Authorization", `Bearer ${token}`).send()
        expect(response.statusCode).toBe(200)
        expect(response.body.walks).toBeDefined()
        expect(response.body.walks.length).toBe(0)
    })
})