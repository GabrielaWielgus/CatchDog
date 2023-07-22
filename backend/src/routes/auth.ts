import { signin } from "../controllers/auth/signin";
import {Router} from "express"
import { validate } from "../middleware/validate";
import { signinValidator } from "../validators/signinValidator";
const router = Router()

router.post("/signin", signinValidator, validate, signin)



export default router
