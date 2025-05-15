import pacienteModel from "../../models/administradores/cadastroPacienteModel.js";

async function renderPage(req, res, obj) {
  if (req.headers.accept && req.headers.accept.includes("text/html")) {
    let pacientes = obj;
    // console.log("Entrou no renderPage como navegador");

    // console.log("Pacientes enviados para o EJS:", pacientes);

    return res.render("administradores/cadastroPacientes", {
      pacientes,
    });
  } else {
    // console.log("Entrou no renderPage como api");

    let pacientes = obj;
    // console.log("Pacientes:", pacientes);

    return res.status(200).json({ pacientes });
  }
}

// Método para buscar todos os pacientes
export async function getAllpacientes(req, res) {
  try {
    const pacientes = await pacienteModel.getAllPaciente();

    await renderPage(req, res, pacientes);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Erro ao buscar pacientes, ${error.message}` });
  }
}

// Método para buscar um paciente pelo nome
export async function getPacienteByName(req, res) {
  try {
    const paciente = await pacienteModel.getPacienteByName(req.params.nome); // Obtém o nome do paciente a partir de req.query

    console.log(
      "cadastroPacienteController.js >>> getPacienteByName | Paciente encontrado: ",
      paciente
    );

    if (!paciente) {
      console.log(
        `cadastroPacienteModel.js getPacienteByName: | paciente ${req.params.nome} não encontrado`
      );
      return res
        .status(404)
        .json({ error: `Paciente não encontrado: ${req.params.nome}` });
    }
    await renderPage(req, res, paciente); // Passa o paciente encontrado para renderPage
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar paciente pelo nome" });
    console.log("cadastroPacienteModel.js getPacienteByName: |", error);
  }
}

// Método para criar um novo paciente
export async function createPaciente(req, res) {
  try {
    // console.log("cadastroPacienteController.js diz: createPaciente: | Criando paciente com os dados:", req.body);
    const paciente = await pacienteModel.createPaciente(req.body);
    console.log(
      "cadastroPacienteController.js diz: createPaciente: | Paciente cadastrado com sucesso:",
      paciente.nome
    );

    await renderPage(req, res, paciente);
  } catch (error) {
    console.log(
      "cadastroPacienteController.js diz: createPaciente: | Não foi possível cadastrar o paciente"
    );
    res.status(500).json({ error: "Erro ao cadastrar o paciente no sistema" });
  }
}

// Método para atualizar um paciente
export async function updatepaciente(req, res) {
  try {
    const pacienteData = req.body; // Dados enviados pelo cliente
    const result = await pacienteModel.updatePaciente(pacienteData);

    if (result.error) {
      return res.status(404).json({ error: result.error });
    }

    res.status(200).json({
      message: "Paciente atualizado com sucesso",
      valores: result,
    });
  } catch (error) {
    console.error("Erro no controlador ao atualizar paciente:", error);
    res.status(500).json({ error: "Erro ao atualizar paciente" });
  }
}

// Método para deletar um paciente
export async function deletePaciente(req, res) {
  try {
    const paciente = await pacienteModel.deletePaciente(req.params.id);
    if (!paciente) {
      console.log(
        "cadastroPacienteController.js diz: Try: | Paciente não encontrado"
      );
      return res.status(404).json({ error: "Paciente não encontrado" });
    }
    console.log(
      "cadastroPacienteController.js diz: Try: | Paciente deletado com sucesso"
    );
    res.status(200).json({ message: "Paciente deletado com sucesso" });
  } catch (error) {
    console.log(
      "cadastroPacienteController.js diz: catch| Erro ao deletar paciente:",
      error
    );
    res
      .status(500)
      .json({
        error:
          "Falha crítíca ao acessar os registros, não foi possível excluir o paciente",
      });
  }
}

