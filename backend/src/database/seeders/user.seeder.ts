import { UserRepository } from "../repositories/user.repository"
import { faker } from "@faker-js/faker"
import * as bcrypt from "bcrypt"
import { SALT_ROUNDS } from "../../config"

export const seedUser = async () => {
    const joe = UserRepository.create({
        email: "Joedoe@gmail.com",
        firstName: "Joe",
        lastName: "Doe",
        password: await bcrypt.hash("test123", SALT_ROUNDS)
    })
    await UserRepository.save(joe)

    const moe = UserRepository.create({
        email: "Moedoe@gmail.com",
        firstName: "Moe",
        lastName: "Doe",
        password: await bcrypt.hash("test123", SALT_ROUNDS)
    })
    await UserRepository.save(moe)

    // Add random users
    for(let i=0; i<10; i++){
        const user = UserRepository.create({
            email: faker.internet.email(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            password: faker.internet.password()
        })
        await UserRepository.save(user)
    }
}