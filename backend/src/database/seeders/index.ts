import { seedUser } from "./user.seeder"
import { seedWalks } from "./walk.seeder"
import {seedChat} from "./chat.seeder"
import {seedMessages} from "./message.seeder"

export const seed = async () => {
    await seedUser()
    await seedWalks() // <-- Order matters
    await seedChat()
    await seedMessages()
}