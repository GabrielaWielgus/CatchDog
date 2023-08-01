import { UserRepository } from "../repositories/user.repository"
import { ChatRepository } from "../repositories/chat.repository"
import { ChatterRepository } from "../repositories/chatter.repository"
import { MessageRepository } from "../repositories/message.repository"
import { Not, In } from "typeorm"
import { User } from "../entities/User"

export const seedChat = async () => {
    
    const joe = await UserRepository.findOneBy({email: "Joedoe@gmail.com"})
    const moe = await UserRepository.findOneBy({email: "Moedoe@gmail.com"})

    const randoms = await UserRepository.findBy({
        email: Not(In(["Joedoe@gmail.com", "Moedoe@gmail.com"]))
    })

    const createChat = async (user1:User, user2:User) : Promise<void> => {
        const chatter1 = ChatterRepository.create()
        const chatter2 = ChatterRepository.create()
        const chat = ChatRepository.create()

        chatter1.chat = chat; chatter1.user = user1 // <-- is this required?
        chatter2.chat = chat; chatter2.user = user2 // <-- is this required?
        chat.chatters = [chatter1, chatter2]

        await ChatRepository.save(chat)
        await ChatterRepository.save(chatter1)
        await ChatterRepository.save(chatter2)
    }
    await createChat(joe, moe)
    
    await createChat(joe, randoms[0])
    await createChat(joe, randoms[1])

    await createChat(moe, randoms[0])
    await createChat(moe, randoms[1])

    await createChat(randoms[0], randoms[1])
}