// console.log("Login script carregado com sucesso!");

// Seleciona o formulário com a classe "login"
document
  .querySelector(".login")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const form = event.target;
    const formData = new FormData(form);

    // Converte os dados do formulário para um objeto JSON
    const data = Object.fromEntries(formData.entries());

    try {
      // Envia os dados para a rota /login usando fetch
      const response = await fetch(form.action, {
        method: form.method,
        headers: {
          "Content-Type": "application/json",
          Accept: "text/html", // Aceita tanto JSON quanto HTML
        },
        body: JSON.stringify(data),
      });

      // Verifica se a resposta não foi bem-sucedida
      if (!response.ok) {
        const errorData = await response.json();
        alert('Erro:', errorData.message); // Exibe a mensagem de erro
        return;
      }

      // Verifica o tipo de conteúdo da resposta
      const contentType = response.headers.get("Content-Type");
      

      if (contentType && contentType.includes("application/json")) {
        // Se a resposta for JSON, processa como JSON
        const responseData = await response.json();
       
        // Armazena o token no localStorage
        if (responseData.token) {
          localStorage.setItem("token", responseData.token);          
        }

      } else if (contentType && contentType.includes("text/html")) {
        // Se a resposta for HTML, processa como HTML
        const html = await response.text();

        // Tenta extrair o token do HTML
        const tokenMatch = html.match(/"token":"(.*?)"/); // Busca o token no HTML
        if (tokenMatch && tokenMatch[1]) {
          localStorage.setItem("token", tokenMatch[1]);
        }

        // Renderiza o HTML retornado pelo backend
        document.open();
        document.write(html);
        document.close();
      } else {
        throw new Error("Tipo de resposta desconhecido");
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      alert("Ocorreu um erro ao tentar realizar o login. Tente novamente.");
    }
  });
