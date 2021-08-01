const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API
const count = 30;
const apiKey = 'ePdYrEuu-WXzbY9nYgmQuXj9-Axjch2z5RsKlFj4Z_s';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
//Check if all images loaded
function imageLoaded() {
}
//Helper Function
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}
//Create elements for links and photos
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    photosArray.forEach((photo) => {
        //Create <a> links
        const item = document.createElement('a');
        /*item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');*/
        setAttributes(item, {
            href:photo.links.html,
            target: '_blank',
        });
        //Create <img>
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            tittle: photo.alt_description,
        });
        //Event Listener, check on each picture load
        img.addEventListener('load', imageLoaded);
        imagesLoaded++;
        console.log(imagesLoaded);
        if (imagesLoaded === totalImages) {
            ready = true;
            loader.hidden = true;
        }
        //Put <img> in <a>
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}





//Get Photos from UNSPLASH
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        //Catch error here
    }
}

//Scrolling 
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
    getPhotos();
    }
});

getPhotos();