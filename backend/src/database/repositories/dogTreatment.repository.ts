import { AppDataSource } from ".."
import { DogTreatment } from "../entities/DogTreatment"

export const DogTreatmentRepository = AppDataSource.getRepository(DogTreatment)



