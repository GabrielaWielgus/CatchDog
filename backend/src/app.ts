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
import walkRouter from "./routes/walk"
import chatRouter from "./routes/chat"
import dogRouter from "./routes/dog"
import treatmentRouter from "./routes/treatment"
import userRouter from "./routes/user"

import { errorHandler, errorResponder } from "./middleware/error"
import { seed } from "./database/seeders"

import { initSocket } from "./socket"

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
    app.use("/walk", walkRouter)
    app.use("/chat", chatRouter)
    app.use("/dog", dogRouter)
    app.use("/treatment", treatmentRouter)
    app.use("/user", userRouter)

    // Global error handling
    app.use(errorHandler)
    app.use(errorResponder)

    // Start http server
    const port = process.env.NODE_ENV === "test" ? process.env.SERVER_PORT : SERVER_PORT
    const server = app.listen(port,() => {
        const address = server.address();
        console.log(address);
    });

    const socket = initSocket(server)
    socket.on("connection", socket => {
        console.log("New connection")
    })
    
    return {app, server}
}