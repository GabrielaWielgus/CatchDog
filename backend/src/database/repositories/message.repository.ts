import { AppDataSource } from ".."
import { Message } from "../entities/chat/Message"

export const MessageRepository = AppDataSource.getRepository(Message)



