/* Function for collapsing header */
const collapseHeader = () => {
    // Get the header container
    let headerContainer = document.querySelector('.header--content--container');
    
    // Add class with collapse animation
    headerContainer.classList.add('collapse');
}

export default {collapseHeader};