import { body } from "express-validator"


export const signinValidator = [
    body("email")
    .trim()
    .notEmpty().withMessage("Email is missing.")
    .isEmail().withMessage("Invalid email format."),

    body("password")
    .notEmpty().withMessage("Password is missing.")
]