import express from "express";

import { getInicio } from "../controllers/indexController.js";
  
const router = express.Router();

// Rotas Login da API
router.get("/", getInicio);

export default router;
