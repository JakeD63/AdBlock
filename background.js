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

function bg_init() {
    document.addEventListener('DOMContentLoaded', function() {
        removeAds(adArray);
    }, false);
}

function removeAds(adList) {
    removeLinks(adList);
    removeImages(adList);
    removeNonMatchingImgTags(adList);
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


//remove images if their src contains an ad domain
function removeNonMatchingImgTags(adList) {
    var imgtags = document.getElementsByTagName('img');

    for (var i = 0; i < imgtags.length; i++) {
        if (!(imgtags[i].src.includes(window.location.href))) {
            imgtags[i].style.display = 'none';
        }
    }
}

function removeIns() {
    var insTags = document.getElementsByTagName('ins');
    for (var i = 0; i < insTags.length; i++) {
        deleteElement(insTags[i]);
    }
}
