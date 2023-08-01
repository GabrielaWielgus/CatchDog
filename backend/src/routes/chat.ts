import { Router } from "express";
import { validate } from "../middleware/validate";
import { auth } from "../middleware/auth";
import { postChat } from "../controllers/chat/postChat";
import { getChat } from "../controllers/chat/getChat";

const router = Router()

router.post("/", auth, validate, postChat)
router.get("/", auth, validate, getChat)
//router.post("/message", auth, createMessageValidator, validate, createMessage)
//router.get("/users", auth, getUsers)

export default router