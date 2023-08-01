import { AppDataSource } from ".."
import { Chatter } from "../entities/chat/Chatter"

export const ChatterRepository = AppDataSource.getRepository(Chatter)



