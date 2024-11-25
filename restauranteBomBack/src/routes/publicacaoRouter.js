import { Router } from "express";
import {
  getAll,
  getPublicacao,
  like,
  deslike
} from "../controllers/publicacaoController.js";
import verifyToken from "../middleware/verify-token.js"

const router = Router();

router.get("/", getAll);
router.get("/:id", verifyToken, getPublicacao);
//Ultima Etápa
router.post("/:id/like",verifyToken, like);
router.post("/:id/deslike",verifyToken, deslike);

export default router;
