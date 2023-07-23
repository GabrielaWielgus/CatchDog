import { UserRepository } from "../repositories/user.repository"
import { faker } from "@faker-js/faker"

export const seedUser = async () => {
    const user = UserRepository.create({
        email: "joedoe@gmail.com",
        firstName: "Joe",
        lastName: "Doe",
        password: "test123"
    })
    await UserRepository.save(user)

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