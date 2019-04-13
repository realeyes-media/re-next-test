var body = document.querySelector('body')
var menuTrigger = document.querySelector('#toggle-main-menu-mobile');
var menuContainer = document.querySelector('#main-menu-mobile');
const hambugerButton = document.getElementById('toggle-main-menu-mobile');

menuTrigger.onclick = function () {
    hambugerButton.style.position = "fixed";
    hambugerButton.style.right = "1rem";
    menuContainer.classList.toggle('open');
    menuTrigger.classList.toggle('is-active')
    body.classList.toggle('lock-scroll')
}
