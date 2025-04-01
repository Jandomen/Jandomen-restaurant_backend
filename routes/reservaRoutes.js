import express from "express";
import { crearReserva, obtenerReservas } from "../controllers/reservaController.js";

const router = express.Router();

router.post("/", crearReserva);
router.get("/", obtenerReservas);

export default router;
