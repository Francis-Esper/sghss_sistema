
// Importa o aplicativo configurado no server.js
import { app } from "../server.js"; 

// Importa as rotas da pasta routes
import cadastroPacienteRoutes from "./routes/administradores/cadastroPacienteRoutes.js";
import indexRoutes from "./routes/indexRoutes.js";
import loginRoutes from "./routes/login/loginRoutes.js";


// Rotas
app.use("/", indexRoutes);
app.use("/login", loginRoutes);
app.use("/administradores/cadastro-pacientes", cadastroPacienteRoutes);

app.get("/favicon.ico", (req, res) => res.status(204).end());

// Para tratar rotas não existentes
app.use((req, res) => {
  //renderiza a página HTML ou retorna JSON
  if (req.headers.accept && req.headers.accept.includes("text/html")) {
    return res.status(404).render("404", { url: req.originalUrl });
  } else {
    return res.status(404).json({
      message: "Rota não encontrada",
      urlSolicitada: `http://localhost:${req.originalUrl}`,
      error: "404",
    });
  }
});
