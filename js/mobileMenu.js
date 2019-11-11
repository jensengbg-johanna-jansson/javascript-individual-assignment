/* Function for the hamburger menu on mobile version of the website */
const toggleMobileMenu = () => {
    //Get the menu items and the menu icon
    let menuItem = document.querySelectorAll('.menu__item');
    let menuIcon = document.querySelector('i');

    // Toggle the menu icon between hamburger icon and cross icon
    menuIcon.classList.toggle("fa-bars");
    menuIcon.classList.toggle("fa-times");

    // Toggle visibility of all menu items
    for(let i=0; i < menuItem.length; i++) {
        menuItem[i].classList.toggle("menu__hidden");
    }
}

export default {toggleMobileMenu};