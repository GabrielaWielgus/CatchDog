import { seedUser } from "./user.seeder"

export const seed = async () => {
    await seedUser()
}