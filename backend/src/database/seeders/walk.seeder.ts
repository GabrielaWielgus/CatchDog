import { UserRepository } from "../repositories/user.repository"
import { WalkRepository } from "../repositories/walk.repository"
import { faker } from "@faker-js/faker"


export const seedWalks = async () => {
    const users = await UserRepository.find()

    for(const user of users){
        for(let i=0; i<5; i++){
            const walk = WalkRepository.create({
                description: faker.lorem.sentence({min: 10, max:20}),
                onLean: ["yes", "no"][Math.floor(Math.random()*2)],
                behavioralDisorder: faker.lorem.word(),
                started: faker.date.past(),
                ended: faker.date.soon(),
                user: user
            })
            await WalkRepository.save(walk)
        }
    }
}