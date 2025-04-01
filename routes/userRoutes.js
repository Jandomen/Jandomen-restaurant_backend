import express from "express";
import { registrarUsuario, autenticarUsuario, obtenerPerfil } from "../controllers/userController.js";
import { protegerRuta } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/registro", registrarUsuario);

router.post("/login", autenticarUsuario);

router.get("/perfil", protegerRuta, obtenerPerfil);

export default router;
