function placeholderRandomizer() {
    let inputBox = document.querySelector('.search--input');
    let placeholderArray = ['flowers','abstract','cats','nature','technology','business','architecture'];

    let randNumber = Math.floor(Math.random() * Math.floor(placeholderArray.length));

    inputBox.setAttribute('placeholder', placeholderArray[randNumber] + '...');
}
placeholderRandomizer();
// hämta sök sträng

//Hämta sökresultat

//returna sökresultat

function getSearchString() {
    let searchString = document.querySelector('.search--input').value;
    console.log(searchString);
}

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

function getSearchResult() {
        // Get search string
    let searchString = document.querySelector('.search--input').value;
    console.log(searchString);

        // Create search URL
    const URL = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=19d3e6e0acfe9c438f368e2c2bab1c5d&text=' + searchString + '&format=json&nojsoncallback=1&per_page=20';
    
    fetch(URL, {
        method: 'GET'
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        let ul = document.querySelector('.photo--container');
            
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

    }).catch(function(error) {
        console.log('THIS IS AN ERROR', error);
    });
}

function photoEnlarge (imgURL) {
    let img = document.createElement('img');
    let largeIMG = document.querySelector('.largeIMG');
    let largeImgContainer = document.querySelector('.largeIMG--container');

    let photoSize = '_c';
    const largeImgURL = imgURL+ photoSize + '.jpg';
    console.log(largeImgURL);

    img.setAttribute('src', largeImgURL);
    largeImgContainer.removeAttribute('hidden');

    largeIMG.appendChild(img);
}

document.querySelector('.search--btn').addEventListener('click', getSearchResult);