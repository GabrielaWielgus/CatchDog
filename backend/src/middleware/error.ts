import { CustomError } from "../utils/CustomError"
import {NextFunction, Response, Request} from "express"

export const errorHandler = (error:any, req:Request, res:Response, next:NextFunction) => {
    console.log("errorHandler")
    if(error instanceof CustomError){
        next(error)
    }else{
        next(new CustomError(error.message, 500))
    }
}

export const errorResponder = (error:CustomError, req:Request, res:Response, next:NextFunction) => {
    console.log("errorResponder")
    const body = {
        message: error.message,
        errors: error.errors
    }
    res.status(error.statusCode || 500).json(body)
}