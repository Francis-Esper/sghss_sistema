import jwt from "jsonwebtoken";
import loginModel from "../../models/login/loginModel.js";

const JWT_SECRET = process.env.JWT_SECRET;

export async function postLogin(req, res) {
  try {
    const { nome_usuario, senha } = req.body;

    // Validação: Verifica se nome_usuario e senha foram fornecidos
    if (!nome_usuario || !senha) {
      return res.status(400).json({
        message: "Os campos 'nome_usuario' e 'senha' são obrigatórios",
      });
    }

    const login = await loginModel.getLogin(nome_usuario, senha);

    if (!login) {
      return res.status(401).json({
        message: "Usuário e/ou senha inválidos",
      });
    }

    // Gera o token JWT
    const token = jwt.sign(
      {
        id: login.id,
        nome_usuario: login.nome_usuario,
        tipo: login.tipo,
      },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expira em 1 hora
    );

    //renderiza a página HTML se for navegador ou retorna JSON se for POSTMAN
    if (req.headers.accept && req.headers.accept.includes("text/html")) {
      return res.render("login/loginExito", { login, token });
    } else {
      return res.status(200).json({
        message: "Login realizado com sucesso",
        login,
        token,
      });
    }
  } catch (error) {
    res.status(500).json({ error: `Erro ao realizar login: ${error.message}` });
  }
}
