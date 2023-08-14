import { body } from "express-validator"


export const patchPasswordValidator = [
  body("password")
  .trim()
  .notEmpty().withMessage("Password must be provided"),

  body("newPassword")
  .trim()
  .notEmpty().withMessage("New password must be provided"),

  body("newPasswordRepeat")
  .trim()
  .notEmpty().withMessage("New password must be repeated")
  .custom(async (newPasswordRepeat, {req}) => {
    if(newPasswordRepeat !== req.body.newPassword){
      throw new Error("Password do not match!")
    }

    return true
  }).withMessage("New passwords must match")
]