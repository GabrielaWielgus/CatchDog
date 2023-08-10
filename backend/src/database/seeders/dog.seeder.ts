import { faker } from "@faker-js/faker"
import { UserRepository } from "../repositories/user.repository"
import { DogRepository } from "../repositories/dog.repository"

export const seedDogs = async () => {
    const users = await UserRepository.find()

    for(const user of users){
        const dog = DogRepository.create({
            owner: user,
            breed: faker.animal.dog(),
            name: faker.person.firstName(),
            age: faker.number.int({
                min: 1,
                max: 15
            }),
            sex: faker.person.sex()
        })
        await DogRepository.save(dog)
    }
    
}