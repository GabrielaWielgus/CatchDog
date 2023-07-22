import { body } from "express-validator";
import { UserRepository } from "../database/repositories/user.repository";
import { error } from "console";

export const signupValidator = [
    body("firstName")
    .trim()
    .notEmpty().withMessage("First name is missing.")
    .isString().withMessage("Is string."),

    body("lastName")
    .trim()
    .notEmpty().withMessage("Last name is missing.")
    .isString().withMessage("Is string."),

    body("email")
    .trim()
    .notEmpty().withMessage("Email is missing.")
    .isEmail().withMessage("Invalid email format.")
    .custom(async (email) => {
        try{
            const user = await UserRepository.findOneBy({email: email})
            if(user){
                throw new Error("User already exists.")
            }
            return true
        }catch(err){
            throw new Error(err.message)
        }
    }).withMessage("User already exists."),

    body("password")
    .trim()
    .notEmpty().withMessage("Missing password."),

    body("passwordRepeat")
    .trim()
    .notEmpty().withMessage("Missing password.")
    .custom(async (passwordRepeat, {req}) => {
        if(passwordRepeat !== req.body.password){
            throw new Error("Passwords must match.")
        }
        return true
    }).withMessage("Passwords must match."),
]


