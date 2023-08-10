import {Router} from "express"
import { validate } from "../middleware/validate";
import { auth } from "../middleware/auth";
import {getDog} from "../controllers/dog/getDog"
import { postDog } from "../controllers/dog/postDog";
import { postDogTreatment } from "../controllers/dog/postDogTreatment";
import { deleteDogTreatment } from "../controllers/dog/deleteDogTreatment";
import { deleteDog } from "../controllers/dog/deleteDog";

const router = Router()

router.get("/", auth, validate, getDog)
router.post("/", auth, validate, postDog)
router.delete("/", auth, validate, deleteDog)

router.post("/treatment", auth, validate, postDogTreatment)
router.delete("/treatment", auth, validate, deleteDogTreatment)



export default router
