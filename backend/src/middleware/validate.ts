import {NextFunction, Request, Response} from "express"
import { validationResult } from "express-validator"
import { CustomError } from "../utils/CustomError"
import * as HttpStatus from "http-status"

export const validate = (req:Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req)
    console.log(errors)
    if(!errors.isEmpty()){
        return next(new CustomError("Validation error", HttpStatus.BAD_REQUEST, errors.array()))
    }
    next()
}