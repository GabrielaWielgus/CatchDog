import { body } from "express-validator";

export const patchUserDataValidator = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is a required field'),
  
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is a required field'),
  
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is a required field'),

  body("email")
  .trim()
  .isEmail()
  .withMessage("Invalid email format")
]