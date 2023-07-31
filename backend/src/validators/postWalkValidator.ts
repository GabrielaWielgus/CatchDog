import { body } from "express-validator"


export const postWalkValidator = [
    body("onLean")
    .trim()
    .notEmpty().withMessage("onLean is missing."),

    body("behavioralDisorder")
    .notEmpty().withMessage("behavioralDisorder is missing"),

    body("description")
    .trim()
    .notEmpty().withMessage("description is missing"),

    body("started")
    .trim()
    .notEmpty().withMessage("Walk start time is missing")
    .isISO8601().withMessage("Must be ISO 8601 format"),

    body("ended")
    .trim()
    .notEmpty().withMessage("Walk finish time is missing")
    .isISO8601().withMessage("Must be ISO 8601 format"),
]