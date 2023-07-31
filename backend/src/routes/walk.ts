import {Router} from "express"
import { validate } from "../middleware/validate";
import { postWalkValidator } from "../validators/postWalkValidator";
import { postWalk } from "../controllers/walk/postWalk";
import { auth } from "../middleware/auth";
import { getWalk } from "../controllers/walk/getWalk";
import { getWalkValidator } from "../validators/getWalkValidator";
import { deleteWalk } from "../controllers/walk/deleteWalk";
const router = Router()

router.post("/", auth, postWalkValidator, validate, postWalk)
router.get("/", auth, getWalkValidator, validate, getWalk)
router.delete("/", auth, deleteWalk) 
export default router
