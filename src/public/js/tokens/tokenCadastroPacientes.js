// Verifica se o token existe no localStorage e redireciona com o cabeçalho Authorization
document
  .getElementById("cadastroPacientesLink")
  .addEventListener("click", async function (event) {
    event.preventDefault(); // Impede o comportamento padrão do link

    const token = localStorage.getItem("token"); // Obtém o token do localStorage

    if (!token) {
      alert("Você precisa estar logado para acessar esta página.");
      return
    }

    const headersJson = {
      Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho Authorization
      "Content-Type": "application/json",
      Accept: "application/json, text/html", // Aceita tanto JSON quanto HTML
    };

    try {
      // Faz uma requisição para verificar o acesso com o token
      const response = await fetch("/administradores/cadastro-pacientes", {
        method: "GET",
        headers: headersJson,
      });


      if (response.ok) {
        // Redireciona para a página se o token for válido
        // window.location.href = response.url; // Redireciona para a URL original

         // Renderiza o HTML retornado pelo backend
         
         const html = await response.text();

         document.open();
         document.write(html);
         document.close();
        
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.message || "Não autorizado"}`);
      }
    } catch (error) {
      console.error("Erro ao verificar o token:", error);
      alert("Ocorreu um erro ao verificar o token. Tente novamente.");
    }
  });
