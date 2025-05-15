console.log("search_scripts.js carregado com sucesso!");

// Função para pesquisar
document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const searchValue = document.getElementById("search").value;
    alert(`Pesquisar pacientes com o nome: ${searchValue}`);
    
    // Lógica para pesquisar pacientes via API ou backend})
  });
