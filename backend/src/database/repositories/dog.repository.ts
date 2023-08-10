import { AppDataSource } from ".."
import { Dog } from "../entities/Dog"

export const DogRepository = AppDataSource.getRepository(Dog)



