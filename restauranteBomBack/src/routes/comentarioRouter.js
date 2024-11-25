import { Router } from "express";
import {
  criarComentario,
  editarComentario,
  excluirComentario,
} from "../controllers/comentarioController.js";

import verifyToken from "../middleware/verify-token.js";
const router = Router();

router.post("/", verifyToken, criarComentario);
router.patch("/:id", verifyToken, editarComentario);
router.delete("/:id", verifyToken, excluirComentario);

export default router;
