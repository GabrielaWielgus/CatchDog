import { DogRepository } from "../repositories/dog.repository"
import { DogTreatmentRepository } from "../repositories/dogTreatment.repository"
import { TreatmentRepository } from "../repositories/treatment.repository"
import { faker } from "@faker-js/faker"

export const seedDogTreatments = async () => {
    const dogs = await DogRepository.find()
    const treatments = await TreatmentRepository.find()

    for(const dog of dogs){
        for(const treatment of treatments){
            const dogTreatment = DogTreatmentRepository.create({
                dog: dog,
                treatment: treatment,
                notes: faker.lorem.sentence(),
                date: faker.date.recent().toISOString(),
                controlDate: faker.date.future().toISOString()
            })
            await DogTreatmentRepository.save(dogTreatment)
        }
    }
}