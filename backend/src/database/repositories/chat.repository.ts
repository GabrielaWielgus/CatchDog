import { AppDataSource } from ".."
import { Chat } from "../entities/chat/Chat"
import {User} from "../entities/User"

import {ChatterRepository} from "./chatter.repository"

export const ChatRepository = AppDataSource.getRepository(Chat).extend({
    createChatWithChatters : async (user1:User, user2:User) => {
        const chatter1 = ChatterRepository.create()
        const chatter2 = ChatterRepository.create()
        const chat = ChatRepository.create()

        chatter1.chat = chat; chatter1.user = user1 // <-- is this required?
        chatter2.chat = chat; chatter2.user = user2 // <-- is this required?
        chat.chatters = [chatter1, chatter2]

        await ChatRepository.save(chat)
        await ChatterRepository.save(chatter1)
        await ChatterRepository.save(chatter2)

        return {
            chat, 
            chatter1,
            chatter2
        }
    }
})



