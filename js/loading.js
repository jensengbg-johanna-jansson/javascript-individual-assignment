/* Function for loading animation */
const loader = () => {
    // Get photo container and div for the loading animation
    let photoContainer = document.querySelector('.photo--container');
    let loaderIcon = document.querySelector('.loader');

    // Toggle the classes wich hides and shows the loading animations
    photoContainer.classList.toggle('fade');
    loaderIcon.classList.toggle('loader--hidden');
}

export default {loader};