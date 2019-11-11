/* Function for ranomizing search input placeholder */
const placeholderRandomizer = () => {
    // Get the search input
    let inputBox = document.querySelector('.search--input');
    // Array with possiple placeholders
    let placeholderArray = ['flowers','abstract','cats','nature','technology','business','architecture'];

    // Create variable with a ranomized number
    let randNumber = Math.floor(Math.random() * Math.floor(placeholderArray.length));

    // Add the placeholder to the input field,  based on the randomized number
    inputBox.setAttribute('placeholder', placeholderArray[randNumber] + '...');
}

export default {placeholderRandomizer};