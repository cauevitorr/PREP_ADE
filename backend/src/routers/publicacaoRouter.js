import { Router } from "express"
import { getAll } from "../controllers/publicacaoController.js"

const router = Router()

router.get("/", getAll)

export default router