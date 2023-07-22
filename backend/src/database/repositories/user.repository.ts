import { AppDataSource } from ".."
import { User } from "../entities/User"

export const UserRepository = AppDataSource.getRepository(User)


