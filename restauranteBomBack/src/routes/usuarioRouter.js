import { Router } from "express";
import { login, logout, userInfo } from "../controllers/usuarioController.js";

//middleware
import verifyToken from "../middleware/verify-token.js";

const router = Router();

// router.post("/", create);
router.post("/login", login);

router.get("/logout",verifyToken, logout);
router.get('/info', verifyToken, userInfo)

export default router;
