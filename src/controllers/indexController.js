export async function getInicio(req, res) {
  try {    
    //renderiza a página HTML ou retorna JSON
    if (req.headers.accept && req.headers.accept.includes("text/html")) {
      
      console.log("indexController.js diz: | Requisição via navegador - Renderizando a página HTML: index.ejs");
      
      return res.render("index");
    } else {
      console.log("indexController.js diz: | Requisição via postman - Retornando mensagem de boas vindas em forma JSON");

      return res.status(200).json({
        message: "Bem-vindo ao SGHSS",
      });
    }
    
  } catch (error) {
    console.log("indexController.js: | Erro ao renderizar ou enviar o json de resposta");
    res.status(500).json({ error: `Rota não encontrada` });
  }
}
