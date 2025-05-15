import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;    
    
    // Extrai o token removendo o prefixo "Bearer"
    const token = authHeader.split(" ")[1];

    // Verifica se o token foi extraído corretamente
    if (!token) {
      return res
        .status(401)
        .json({ message: "Acesso negado. Token não fornecido." });
    }

    // Verifica e decodifica o token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Armazena os dados do usuário no objeto req
    req.user = decoded;

    // console.log("Passou pelo middleware de autenticação sem erro");
    next(); // Continua para a próxima função
  } catch (error) {
    console.error("Erro ao verificar o token:", error.message);
    return res.status(403).json({ message: "Token inválido ou expirado." });
  }
};
