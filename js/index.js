/* Mobile menu display manipulation */
/*
toggleMobileMenu = () => {
    let menuItem = document.querySelectorAll('.menu__item');
    let menuIcon = document.querySelector('i');

    menuIcon.classList.toggle("fa-bars");
    menuIcon.classList.toggle("fa-times");

    for(i=0; i < menuItem.length; i++) {
        menuItem[i].classList.toggle("menu__hidden");
    }
}
document.querySelector('.hamburger__menu').addEventListener('click', toggleMobileMenu);
*/

import * as mobileMenu from 'mobileMenu.js';
document.querySelector('.hamburger__menu').addEventListener('click', mobileMenu.toggleMobileMenu);


/* Placeholder randomizer function */
placeholderRandomizer = () => {
    let inputBox = document.querySelector('.search--input');
    let placeholderArray = ['flowers','abstract','cats','nature','technology','business','architecture'];

    let randNumber = Math.floor(Math.random() * Math.floor(placeholderArray.length));

    inputBox.setAttribute('placeholder', placeholderArray[randNumber] + '...');
}
placeholderRandomizer();


/* Front Page popular photos view */
getPopularPhotos = () => {
    loader();

        // Create search URL
    const URL2 = 'https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=19d3e6e0acfe9c438f368e2c2bab1c5d&format=json&nojsoncallback=1&safe_search=1&per_page=20';
    const URL = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=19d3e6e0acfe9c438f368e2c2bab1c5d&text=nature&format=json&nojsoncallback=1&sort=relevance&per_page=20';

    photoResult(URL);
}
getPopularPhotos();


/* */
/* Search function */
/* */

    // Get filter information
function getImgPerPage() {
    let perPage = document.querySelector('.imgPerPage').value;
    console.log(perPage);
    return perPage;
}
document.querySelector('.imgPerPage').addEventListener('change', getImgPerPage);


function collapseHeader() {
    let headerContainer = document.querySelector('.header--content--container');
    headerContainer.classList.add('collapse');
}

function loader() {
    let photoContainer = document.querySelector('.photo--container');
    let loaderIcon = document.querySelector('.loader');

    photoContainer.classList.toggle('fade');
    loaderIcon.classList.toggle('loader--hidden');
}

    //Search function
function getSearchResult(searchInput) {
    loader();
    collapseHeader();
        // Get search string
    let searchString = document.querySelector('.search--input').value;
    let imgPerPage = getImgPerPage();
    console.log(searchString);
    console.log(imgPerPage);

        // Create search URL
    const URL = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=19d3e6e0acfe9c438f368e2c2bab1c5d&text=' + searchString + '&format=json&nojsoncallback=1&sort=relevance&per_page=' + imgPerPage;
    photoResult(URL);
}


function photoResult(URL) {    
        //Get the search result
    fetch(URL, {
        method: 'GET'
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        let ul = document.querySelector('.photo--container');
            //Remove all the images already inside the ul
        while (ul.hasChildNodes()) {  
            ul.removeChild(ul.firstChild);
        } 

            //Loop through the search result and add images to HTML
        for (i=0; i<data.photos.photo.length; i++) {
                // Create LI and IMG tags
            let li = document.createElement('li');
            let img = document.createElement('img');
                // set info needed for the image url
            let photoID = data.photos.photo[i].id;
            let farmId = data.photos.photo[i].farm;
            let photoSecret = data.photos.photo[i].secret;
            let photoServer = data.photos.photo[i].server;
            let photoSize = '_q';
                // create image url
            const imgURL = 'https://farm' + farmId + '.staticflickr.com/' + photoServer + '/' + photoID + '_' + photoSecret;
            const thumbImgURL = imgURL+ photoSize + '.jpg';

                //set attrinutes to html-tags
            li.setAttribute('class', 'photo__item');
            img.setAttribute('src', thumbImgURL);

            img.addEventListener('click', function() {
                photoEnlarge(imgURL);
            });

                // add LI and IMG tags to page
            li.appendChild(img);
            ul.appendChild(li);
        }
        loader();

    }).catch(function(error) {
        console.log('THIS IS AN ERROR', error);
    });
}
document.querySelector('.search--input').addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        getSearchResult();
    }
});
document.querySelector('.search__btn').addEventListener('click', getSearchResult);



// Lightbox
function loader2() {
    let loaderIcon = document.querySelector('.loader');

    loaderIcon.classList.toggle('loader--hidden');
}

function getPhotoSize() {
    let screenWidth = window.innerWidth;
    let photoSize = '';

    if(screenWidth <= 350) {
        photoSize = '_n';
    } else if(screenWidth > 350 && screenWidth <= 650) {
        photoSize = '_z';
    } else if(screenWidth > 650 && screenWidth <= 1080) {
        photoSize = '_b';
    } else if(screenWidth > 1080) {
        photoSize = '_k';
    }
    return photoSize;
}


function photoEnlarge (imgURL) {
    let img = document.createElement('img');
    let largeIMG = document.querySelector('.largeIMG');
    let largeImgContainer = document.querySelector('.largeIMG--container');

    let photoSize = getPhotoSize();
    const largeImgURL = imgURL + photoSize + '.jpg';
    console.log(largeImgURL);

    img.setAttribute('src', largeImgURL);
    img.setAttribute('class', 'largeIMG__img');
    largeImgContainer.style.display = 'flex';

    largeIMG.appendChild(img);

        //Close the lightbox
    function closeLightBox(){
        largeImgContainer.style.display = 'none';
        
        if (document.querySelector('.largeIMG__img')) {
            largeIMG.removeChild(document.querySelector('.largeIMG__img'));
        }
    }
    largeImgContainer.addEventListener('click', closeLightBox);
    document.querySelector('.close__btn').addEventListener('click', closeLightBox);
}

document.querySelector('.backToTop__btn').addEventListener('click', function(){window.scrollTo(0, 0);});




/*
async function getSearchResult() {
    //Hämta användarens söksträng
    let searchString = document.querySelector('.search--input').value;
    console.log(searchString);

    const URL = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=19d3e6e0acfe9c438f368e2c2bab1c5d&text=' + searchString + '&format=json&nojsoncallback=1';

    // Hämta söksvar från Flickr
    let response = await fetch(URL, {method: 'GET'});
    let data = await response.json();
    console.log(response);
    
    return await response;
}
*/