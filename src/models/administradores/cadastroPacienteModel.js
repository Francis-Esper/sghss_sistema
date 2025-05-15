import { pool } from "../../config/db.js"; // Importa a configuração do banco de dados

// Método para buscar todos os pacientes
const getAllPaciente = async () => {
  const query = `SELECT ID,
                        NOME,
                        TO_CHAR(DATA_NASCIMENTO, 'DD/MM/YYYY') AS DATA_NASCIMENTO,
                        GENERO,
                        TELEFONE_CONTATO,
                        EMAIL,
                        TO_CHAR(CRIADO_EM, 'DD/MM/YYYY') AS CRIADO_EM,
                        TO_CHAR(ATUALIZADO_EM, 'DD/MM/YYYY') AS ATUALIZADO_EM
                    FROM PACIENTE
                    ORDER BY ID ASC`;
  const result = await pool.query(query);
  console.log("cadastroPacienteModel.js diz >>> getAllPaciente: ", result.rows); // Loga os resultados da consulta
  return result.rows; // Retorna todos os registros encontrados
};

// Método para encontrar um paciente pelo ID
const getPacienteByName = async (nome) => {
  const query = "SELECT * FROM paciente WHERE nome = $1";
  const values = [nome];
  const result = await pool.query(query, values);
  console.log(
    "cadastroPacienteModel.js >>> getPacienteByName: Paciente encontrado |",
    result.rows.nome
  ); // Loga os resultados da consulta
  return result.rows[0]; // Retorna o primeiro registro encontrado
};

// Método para criar um novo paciente
const createPaciente = async (pacienteData) => {
  try {
    const {
      usuario_id,
      nome,
      data_nascimento,
      genero,
      telefone_contato,
      email,
    } = pacienteData;
    const query = `
        INSERT INTO paciente (usuario_id, nome, data_nascimento, genero, telefone_contato, email)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`;
    const values = [
      usuario_id,
      nome,
      data_nascimento,
      genero,
      telefone_contato,
      email,
    ];
    const result = await pool.query(query, values);
    console.log(
      "cadastroPacienteModel.js diz >>> createPaciente: Paciente cadastrado com sucesso ",
      result.rows[0].nome
    ); // Loga os resultados da consulta
    return result.rows[0]; // Retorna o registro recém-criado
  } catch (error) {
    console.error(
      "cadastroPacienteModel.js diz >>> createPaciente: Erro ao gravar paciente no banco de dados |",
      error.detail
    ); // Loga os resultados da consulta
    return res
      .status(500)
      .json({
        error: "Erro ao criar paciente, contato o administrador do sistema",
        error,
      });
  }
};

// Método para atualizar os dados de um paciente
const updatePaciente = async (pacienteData) => {
  try {
    const {
      nome,
      data_nascimento,
      genero,
      telefone_contato,
      email,
      id_paciente,
    } = pacienteData;

    // Consulta para obter os valores iniciais
    const querySelect = "SELECT * FROM paciente WHERE id = $1";
    const initialResult = await pool.query(querySelect, [id_paciente]);

    if (initialResult.rows.length === 0) {
      console.error(
        "cadastroPacienteModel.js diz >>> updatePaciente: Paciente não encontrado"
      );
      return { error: "Paciente não encontrado" };
    }

    const initialValues = initialResult.rows[0]; // Valores iniciais do paciente

    // Consulta para atualizar os valores
    const queryUpdate = `
        UPDATE paciente
        SET nome = $1, data_nascimento = $2, genero = $3, telefone_contato = $4, email = $5
        WHERE id = $6
        RETURNING *`;
    const values = [
      nome,
      data_nascimento,
      genero,
      telefone_contato,
      email,
      id_paciente,
    ];
    const updatedResult = await pool.query(queryUpdate, values);

    const updatedValues = updatedResult.rows[0]; // Valores atualizados do paciente

    console.log(
      "cadastroPacienteModel.js diz >>> updatePaciente: Paciente atualizado com sucesso ",
      updatedValues.nome
    );

    // Retorna os valores iniciais e atualizados
    return {
      valores_iniciais: initialValues,
      valores_atualizados: updatedValues,
    };
  } catch (error) {
    console.error(
      "cadastroPacienteModel.js diz >>> updatePaciente: Erro ao atualizar paciente no banco de dados |",
      error.detail
    );
    throw new Error(
      "Erro ao atualizar paciente, contate o administrador do sistema"
    );
  }
};

// Método para deletar um paciente pelo ID
const deletePaciente = async (id) => {
  const query = "DELETE FROM paciente WHERE id = $1 RETURNING *";
  const values = [id];

  console.log("cadastroPacienteModel.js diz: Query: |", query);
  const result = await pool.query(query, values);

  return result.rows[0]; // Retorna o registro deletado
};

// Exporta os métodos como um objeto
export default {
  getAllPaciente,
  getPacienteByName,
  createPaciente,
  updatePaciente,
  deletePaciente,
};
