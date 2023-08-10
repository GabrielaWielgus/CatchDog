import { UserRepository } from "../repositories/user.repository"
import { faker } from "@faker-js/faker"
import { TreatmentRepository } from "../repositories/treatment.repository"

export const seedTreatments = async () => {
    const treatments = [
        'Deworming',
        'External Parasite',
        'Regulation of Rutting',
        'Rabies Vaccination',
        'Vaccination'
    ]

    for(const treatment of treatments){
        const trt = TreatmentRepository.create({
            name: treatment
        })
        await TreatmentRepository.save(trt)
    }
}