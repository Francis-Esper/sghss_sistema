// Importa o aplicativo configurado no app.js
import bodyParser from "body-parser";
import express from "express";
import path from "path";
import { connectDB } from "./src/config/db.js";

// Cria a constante com o nº da porta que o servidor vai rodar
// Caso não tenha a variável de ambiente PORT, o servidor vai rodar na porta 3000
const PORT = process.env.PORT || 3000;

const app = express();

// Configura o diretório de arquivos estáticos
app.use(express.static(path.join(path.resolve(), "src", "public")));

// Configura o mecanismo de visualização como EJS
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Tentar criar a conexão com o banco de dados

connectDB();  


// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`server.js | Servidor rodando na porta: ${PORT} http://localhost:${PORT}`);
});

export { app };
