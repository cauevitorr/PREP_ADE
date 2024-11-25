import { Router } from "express";
import {
  getEmpresa,
} from "../controllers/empresaController.js";

const router = Router();

router.get("/", getEmpresa);

export default router;
