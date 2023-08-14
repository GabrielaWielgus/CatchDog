
import {Router} from "express"
import { validate } from "../middleware/validate";
import { auth } from "../middleware/auth";
import {patchPassword} from "../controllers/user/patchPassword"
import { patchPasswordValidator } from "../validators/patchPasswordValidator";
import { patchUserData } from "../controllers/user/patchUserData";
import { patchUserDataValidator } from "../validators/patchUserDataValidator";

const router = Router()

router.patch("/password", auth, patchPasswordValidator, validate, patchPassword)
router.patch("/data", auth, patchUserDataValidator, validate, patchUserData)




export default router
