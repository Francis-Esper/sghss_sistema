// Obtém o token do atributo data-token do elemento <body>
const bodyElement = document.querySelector("body");
const token = bodyElement.getAttribute("data-token");

// Armazena o token no localStorage
try {
  if (token) {
    localStorage.setItem("token", token);
    // console.log('Login Efetuado com Sucesso!');
    alert("Login Efetuado com Sucesso!");
  }
} catch (error) {
  console.error("Erro ao armazenar o token:", error.message);
}
