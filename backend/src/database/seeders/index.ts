import { seedUser } from "./user.seeder"
import { seedWalks } from "./walk.seeder"
import {seedChat} from "./chat.seeder"
import {seedMessages} from "./message.seeder"
import { seedTreatments } from "./treatment.seeder"
import { seedDogs } from "./dog.seeder"
import { seedDogTreatments } from "./dogTreatments.seeder"

export const seed = async () => {
    await seedTreatments()

    await seedUser()
    await seedDogs()
    await seedDogTreatments()
    await seedWalks() // <-- Order matters
    await seedChat()
    await seedMessages()
}