console.log("menu_scripts.js loaded"); // Mensagem de depuração para verificar se o script foi carregado


// Função para ocultar ou exibir as listas (ul) no menu lateral
function toggleSidebar() {
  const menuLists = document.getElementsByClassName("menu-list"); // Coleção de elementos
  const sidebar = document.getElementById("sidebar"); // Background sidebar
  const toggleSidebar = document.getElementById("toggleSidebar"); // Botão de alternância
  const body = document.querySelector("body");

  // Itera sobre todos os elementos com a classe "menu-list"
  for (let i = 0; i < menuLists.length; i++) {
    const menuList = menuLists[i];
    if (menuList.style.display === "none" || menuList.style.display === "") {
      menuList.style.display = "block"; // Exibe o menu lateral
      sidebar.style.display = "block"; // Exibe o background sidebar
      toggleSidebar.style.left = "230px";
      body.style.gridTemplateColumns = "0.5fr 3fr"; // Ajusta o grid para exibir o menu
    } else {
      menuList.style.display = "none"; // Oculta o menu lateral
      sidebar.style.display = "none"; // Oculta o background sidebar
      toggleSidebar.style.left = "5px"; // Oculta o botão de alternância
      body.style.gridTemplateColumns = "0.01fr 3fr"; // Ajusta o grid para ocultar o menu
    }
  }
}
