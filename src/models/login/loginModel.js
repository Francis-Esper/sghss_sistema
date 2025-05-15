import bcrypt from "bcrypt";
import { pool } from "../../config/db.js";

// Método para verificar o login
const getLogin = async (nome_usuario, senha) => {
  const query = `
    SELECT id, tipo, nome_usuario, senha, criado_em, atualizado_em
    FROM usuario
    WHERE nome_usuario = $1
  `;
  const values = [nome_usuario];
  const result = await pool.query(query, values);

  // Usuário não encontrado
  if (result.rows.length === 0) {
    console.log("LoginModel.js >>> getLogin: Usuário não encontrado");
    return 'Usuário não encontrado'; // Retorna uma mensagem de erro
  }

  const usuario = result.rows[0];
    

  // Compara a senha em texto claro com o hash armazenado
  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  
  if (!senhaValida) {    
    console.log("LoginModel.js >>> getLogin: Senha incorreta");
    return null; // Senha inválida
  }

  // Retorna o usuário sem a senha
  delete usuario.senha;
  console.log(`LoginModel.js >>> getLogin: Login efetuado com sucesso | usuário: ${usuario.nome_usuario}`);
  return usuario;
};

// Exporta os métodos como um objeto
export default {
  getLogin,
};
