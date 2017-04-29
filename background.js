//FILE: background.js
//this scrapes static elements from the page
//most pages do not use static elements, but rather
//use scripts to load ads, but it doesn't hurt to
//look anyway

chrome.storage.sync.get(['disable', 'whitelist'], function(response) {
    //if extension is not disabled
    if (!response.disable) {
        //if whitelist is not empty
        if (response.whitelist) {
            //get base url
            var pathArray = window.location.href.split('/');
            var url = pathArray[0] + '//' + pathArray[2];
            if (response.whitelist.indexOf(url) == -1) {
                bg_init();
            }
            //else if whitelist is empty
        } else
            bg_init();
    }
});

//add the listener for scrapign on page load
function bg_init() {
    document.addEventListener('DOMContentLoaded', function() {
        removeAds(adArray);
    }, false);
}

//scrapes page on dom load for static images and links
function removeAds(adList) {
    removeLinks(adList);
    removeImages(adList);
    removeIns();
}

//walks page removing any element with a source matching one from adList array
function removeLinks(adList) {
    l = document.links;
    if (!l)
        return;
    for (var i = 0; i < l.length; i++) {
        for (var x in adList) {
            if (l[i].href.includes(adList[x])) {
                deleteElement(l[i]);
            }
        }
    }
}


//remove images if their src contains an ad domain
function removeImages(adList) {
    var images = document.getElementsByTagName('img');
    if (!images)
        return;
    for (var i = 0; i < images.length; i++) {
        for (var x in adList) {
            if (images[i].src.includes(adList[x])) {
                deleteElement(images[i]);
            }
        }
    }
}

//removes insert tags
//these sometimes get injected into a page
//or used as a container for ads
function removeIns() {
    var insTags = document.getElementsByTagName('ins');
    for (var i = 0; i < insTags.length; i++) {
        deleteElement(insTags[i]);
    }
}
