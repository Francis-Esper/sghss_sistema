console.log("Pacientes scripts carregado com sucesso! xxx.");

// Função para editar paciente
function editarPaciente(id) {
  alert(`Editar paciente com ID: ${id}`);
  // Redirecionar para a página de edição 
}

async function excluirPaciente(id) {
  if (confirm(`Tem certeza que deseja excluir o paciente com ID: ${id}?`)) {
    try {
      const response = await fetch(`/administradores/cadastro-pacientes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Adiciona o token de autenticação
        },
      });

      if (response.ok) {
        alert(`Paciente com ID: ${id} excluído com sucesso.`);
        // Atualiza a página ou remove o paciente da lista
        location.reload(); // Recarrega a página para atualizar a lista
      } else {
        const errorData = await response.json();
        alert(`Erro ao excluir paciente: ${errorData.message || "Erro desconhecido"}`);
      }
    } catch (error) {
      console.error("Erro ao excluir paciente:", error);
      alert("Ocorreu um erro ao tentar excluir o paciente.");
    }
  }
}


{
  "message": "Paciente deletado com sucesso"
}