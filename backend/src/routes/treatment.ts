import {Router} from "express"
import { validate } from "../middleware/validate";
import { getTreatment } from "../controllers/dog/getTreatment";

const router = Router()

router.get("/", validate, getTreatment)

export default router
