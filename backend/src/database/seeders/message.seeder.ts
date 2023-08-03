import {MessageRepository} from "../repositories/message.repository"
import {ChatRepository} from '../repositories/chat.repository'
import { Chat } from "../entities/chat/Chat"
import { User } from "../entities/User"
import { faker } from "@faker-js/faker"


export const seedMessages = async () => {
    const chats = await ChatRepository.find()
    
    const createMessage = async (chat:Chat, sender:User) => {
        const msg = MessageRepository.create({
            data: faker.lorem.sentence(),
            chat: chat,
            sender: sender,
            created: faker.date.past().toISOString()
        })
        await MessageRepository.save(msg)
    }
    
    for(const chat of chats){
        for(let i=0; i<20; i++){
            await createMessage(chat, chat.chatters[Math.floor(Math.random()*chat.chatters.length)].user)
        }
    }
}