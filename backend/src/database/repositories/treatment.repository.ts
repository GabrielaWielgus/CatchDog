import { AppDataSource } from ".."
import { Treatment } from "../entities/Treatment"

export const TreatmentRepository = AppDataSource.getRepository(Treatment)



