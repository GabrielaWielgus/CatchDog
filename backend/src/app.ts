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

export interface App {
    app:express.Application, 
    server:http.Server
}

export const createApp = async () : Promise<App> => {
    const app = express()

    await AppDataSource.initialize()
   

    // Cors
    app.use(cors({
        origin: ["http://localhost:5173", "http://localhost:8000"]
    }))


    // Request body parser
    app.use(express.json())

    // Endpoints
    // app.use("path", router)
    // ... 
    // ...

    // Global error handling
    app.use((error:CustomError, req:Request, res:Response, next:express.NextFunction) => {
        const body = {
            message: error.message,
            data: error.data
        }
        res.status(error.statusCode || 500).json(body)
    })

    // Start http server
    const port = process.env.NODE_ENV === "test" ? process.env.SERVER_PORT : SERVER_PORT
    const server = app.listen(port, () => {
        console.log(`Listening on ${port}`);
    });
    
    return {app, server}
}