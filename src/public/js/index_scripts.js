// console.log("index_scripts.js loaded");

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.endsWith("index")) {
        const sidebarMenuItems = document.querySelectorAll(".sidebar-menu-item");
        sidebarMenuItems.forEach(item => {
            item.setAttribute("disabled", "true");
        });
    }
});