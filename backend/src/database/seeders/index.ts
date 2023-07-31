import { seedUser } from "./user.seeder"
import { seedWalks } from "./walk.seeder"

export const seed = async () => {
    await seedUser()
    await seedWalks() // <-- Order matters
}