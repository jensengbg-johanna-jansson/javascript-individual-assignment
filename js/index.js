import placeholder from './placeholder.js';
import mobileMenu from './mobileMenu.js';
import headerEffect from './headerEffects.js';
import loading from './loading.js';

// Add event listener to hamburger menu
document.querySelector('.hamburger__menu').addEventListener('click', mobileMenu.toggleMobileMenu);

// Add the random placeholder
placeholder.placeholderRandomizer();

// Add event listener for back to top function
document.querySelector('.backToTop__btn').addEventListener('click', function(){window.scrollTo(0, 0);});


/* */
/* Search function */
/* */
function getSearchResult(buttonClick) {
    //start loading function
    loading.loader();
    
    // Only collapse header if button click
    if(buttonClick === 1) {
        // start functin for collapsing header
        headerEffect.collapseHeader();
    }

    // Get search string
    let searchString = document.querySelector('.search--input').value;
    // Get number of images per page that is currently chosen
    let imgPerPage = document.querySelector('.imgPerPage').value;
    let sortImages = document.querySelector('.sortBy').value;
    // Declare URL variable
    let URL;

    // If there is no search string URL is same as getPopularPhotos URL. Otherwise URL uses the search string
    if(searchString === '' || null) {
        // Create URL with Flickr API getRecent
        URL = 'https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=19d3e6e0acfe9c438f368e2c2bab1c5d&format=json&nojsoncallback=1&safe_search=1&per_page=' + imgPerPage;
    } else {
        // Create search URL with the search string
        URL = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=19d3e6e0acfe9c438f368e2c2bab1c5d&text=' + searchString + '&format=json&nojsoncallback=1&sort=' + sortImages + '&per_page=' + imgPerPage;
    }

    // Send URL to photoresult function
    photoResult(URL);
}
// Call function to display most recent images when enter website
getSearchResult(0);

// Set event listeners for search button, search input and filters
document.querySelector('.search--input').addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        getSearchResult(1);
    }
});
document.querySelector('.search__btn').addEventListener('click', function(){getSearchResult(1)});
document.querySelector('.imgPerPage').addEventListener('change', getSearchResult);
document.querySelector('.sortBy').addEventListener('change', getSearchResult);



/* */
/* Flickr fetch function */
/* */
async function photoResult(URL) {
    // Get response from Flickr
    let response = await fetch(URL, {method: 'GET'});
    let data = await response.json();

    // Get photo container ul
    let ul = document.querySelector('.photo--container');
    //Remove all images that are already inside the ul
    while (ul.hasChildNodes()) {  
        ul.removeChild(ul.firstChild);
    } 

    //Loop through the search result for adding images to HTML
    for (let i=0; i<data.photos.photo.length; i++) {
        // Create li and img tags
        let li = document.createElement('li');
        let img = document.createElement('img');
            
        // Set variables for data needed for the image url
        let photoID = data.photos.photo[i].id;
        let farmId = data.photos.photo[i].farm;
        let photoSecret = data.photos.photo[i].secret;
        let photoServer = data.photos.photo[i].server;
        let photoSize = '_q';
            
        // create image url
        const imgURL = 'https://farm' + farmId + '.staticflickr.com/' + photoServer + '/' + photoID + '_' + photoSecret;
        const thumbImgURL = imgURL + photoSize + '.jpg';

        //set attrinutes and classes to html-tags
        li.setAttribute('class', 'photo__item');
        img.setAttribute('src', thumbImgURL);

        // Add eventlistener to every images
        img.addEventListener('click', function() {
            photoEnlarge(imgURL);
        });

        // add li and img tags to page
        li.appendChild(img);
        ul.appendChild(li);
    }
    // End loader animation
    loading.loader();
    
    return await response;
}

/* */
/* Lightbox */
/* */

function getPhotoSize() {
    // Get screen width and declare photoSize variable
    let screenWidth = window.innerWidth;
    let photoSize = '';

    // Set photoSize value based on screen width
    if(screenWidth <= 350) {
        photoSize = '_n';
    } else if(screenWidth > 350 && screenWidth <= 650) {
        photoSize = '_z';
    } else if(screenWidth > 650) {
        photoSize = '_b';
    }
    return photoSize;
}

function photoEnlarge (imgURL) {
    // Create img tag
    let img = document.createElement('img');
    // Get lightbox container
    let largeIMG = document.querySelector('.largeIMG');
    let largeImgContainer = document.querySelector('.largeIMG--container');
    // Set photo size
    let photoSize = getPhotoSize();
    // Create image url
    const largeImgURL = imgURL + photoSize + '.jpg';

    // Set img class and url
    img.setAttribute('src', largeImgURL);
    img.setAttribute('class', 'largeIMG__img');
    
    // Display lightbox
    largeImgContainer.style.display = 'flex';

    // Add img to html
    largeIMG.appendChild(img);

    //Lightbox close function
    function closeLightBox(){
        // Hide lightbox
        largeImgContainer.style.display = 'none';
        
        // Remove img tag from lightbox
        if (document.querySelector('.largeIMG__img')) {
            largeIMG.removeChild(document.querySelector('.largeIMG__img'));
        }
    }

    // Add event listeners for closing lightbox
    largeImgContainer.addEventListener('click', closeLightBox);
    document.querySelector('.close__btn').addEventListener('click', closeLightBox);
}