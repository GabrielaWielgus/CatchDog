import { signin } from "../controllers/auth/signin";
import { signup } from "../controllers/auth/signup";
import {Router} from "express"
import { validate } from "../middleware/validate";
import { signinValidator } from "../validators/signinValidator";
import { signupValidator } from "../validators/signupValidator";
import { refresh } from "../controllers/auth/refresh";

const router = Router()

router.post("/signin", signinValidator, validate, signin)
router.post("/signup", signupValidator, validate, signup)
router.post("/refresh", validate, refresh)



export default router
