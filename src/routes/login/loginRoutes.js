import express from "express";

import { postLogin } from "../../controllers/login/LoginController.js";
  
const router = express.Router();

// Rotas Login da API

router.post("/", postLogin);

export default router;
