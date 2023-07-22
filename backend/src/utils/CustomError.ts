import { ValidationError } from "express-validator"

export class CustomError extends Error{
    public statusCode: number | null = null
    public data: ValidationError[] | null = null

    constructor(msg: string, code: number, data?: ValidationError[]){
        super(msg)
        this.data = data
        this.statusCode = code
    }
}