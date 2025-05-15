import express from "express";

import {
  createPaciente,
  deletePaciente,
  getAllpacientes,
  getPacienteByName,
  updatepaciente,
} from "../../controllers/administradores/cadastroPacienteController.js";

import { authenticateToken } from "../../routes/auth/authMiddleware.js"; // Middleware para autenticação de token JWT
const router = express.Router();

// Rotas pacientes da API
router.get("/", authenticateToken, getAllpacientes);
router.get("/:nome", authenticateToken, getPacienteByName);
router.post("/", authenticateToken, createPaciente);
router.patch("/", authenticateToken, updatepaciente);
router.delete("/:id", authenticateToken, deletePaciente);

export default router;
