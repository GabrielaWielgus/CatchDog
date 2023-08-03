import { Router } from "express";
import { validate } from "../middleware/validate";
import { auth } from "../middleware/auth";
import { getChat } from "../controllers/chat/getChat";
import { postChat } from "../controllers/chat/postChat";
import { postMessage } from "../controllers/chat/message/postMessage";
import { getMessage } from "../controllers/chat/message/getMessage";

const router = Router()

router.post("/", auth, validate, postChat)
router.get("/", auth, validate, getChat)
router.post("/message", auth, validate, postMessage)
router.get("/message", auth, validate, getMessage)
//router.post("/message", auth, createMessageValidator, validate, createMessage)
//router.get("/users", auth, getUsers)

export default router