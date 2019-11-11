/* Mobile menu display manipulation */
const toggleMobileMenu = () => {
    let menuItem = document.querySelectorAll('.menu__item');
    let menuIcon = document.querySelector('i');

    menuIcon.classList.toggle("fa-bars");
    menuIcon.classList.toggle("fa-times");

    for(i=0; i < menuItem.length; i++) {
        menuItem[i].classList.toggle("menu__hidden");
    }
}
document.querySelector('.hamburger__menu').addEventListener('click', toggleMobileMenu);
