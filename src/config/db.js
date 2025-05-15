import dotenv from "dotenv";
import pg from "pg";

const { Pool } = pg;

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const connectionString = process.env.DB_URI;

const pool = new Pool({
  connectionString,
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log(
      "db.js: | Conexão com o banco de dados estabelecida com sucesso!"
    );
  } catch (error) {
    // Verifica se a propriedade "errors" existe no objeto "error"
    if (error.errors && Array.isArray(error.errors)) {
      const firstError = error.errors[0]; // Obtém o primeiro erro do array
      console.error(
        `db.js | Falha na conexão com o banco de dados: 
        Mensagem: ${firstError.message} 
          Código: ${firstError.code} 
         Syscall: ${firstError.syscall} 
        Endereço: ${firstError.address} 
           Porta: ${firstError.port}`
      );
    } else {
      // Caso a propriedade "errors" não exista, exibe o erro padrão
      console.error(
        "db.js | Falha na conexão com o banco de dados:",
        error.message
      );
    }
    
  }
};

// Exporta o pool e a função connectDB separadamente
export { connectDB, pool };
