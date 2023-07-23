import * as express from "express"
import * as cors from "cors"
import { CustomError } from "./utils/CustomError"
import { Request, Response } from "express"
import { SERVER_PORT } from "./config"
import * as process from "process"
import * as http from "http"
import { User } from "./database/entities/User"

import { AppDataSource } from "./database"
import { UserRepository } from "./database/repositories/user.repository"

import authRouter from "./routes/auth"
import { errorHandler, errorResponder } from "./middleware/error"
import { seed } from "./database/seeders"

export interface App {
    app:express.Application, 
    server:http.Server
}

export const createApp = async () : Promise<App> => {
    const app = express()

    await AppDataSource.initialize()
    await seed()

    // Cors
    app.use(cors({
        origin: ["http://localhost:5173", "http://localhost:8000"]
    }))


    // Request body parser
    app.use(express.json())

    // Endpoints
    app.use("/auth", authRouter)
    // ... 
    // ...

    // Global error handling
    app.use(errorHandler)
    app.use(errorResponder)

    // Start http server
    const port = process.env.NODE_ENV === "test" ? process.env.SERVER_PORT : SERVER_PORT
    const server = app.listen(port, () => {
        console.log(`Listening on ${port}`);
    });
    
    return {app, server}
}