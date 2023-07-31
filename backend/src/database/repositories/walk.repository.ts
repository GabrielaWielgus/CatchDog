import { AppDataSource } from ".."
import { Walk } from "../entities/Walk"

export const WalkRepository = AppDataSource.getRepository(Walk)