//start by loading in ad file
//NOTE: right now, the file will get loaded each time you load a page
//later I plan on moving this to a global object that is persistend across
//all pages, so we only load the file once

//uncomment this to run scraper automatically
//start();

//recieve message from popup.js
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if(request.function === 'scrape') {
    start();
  }
});

function start() {
  readAdList(chrome.runtime.getURL("adlist.txt"), 4, removeAds);

  //TODO: call removeAds with user list
  //here since user list does not rely on async
}

function removeAds(adList) {
  removeLinks(adList);
  removeImages(adList);
  removeIns();
  removeIFrames();
  console.log("Done Scraping");
}

//walks page removing any element with a source matching one from adList array
function removeLinks(adList) {
  var links = [], l = document.links;
  for(var i = 0; i < l.length; i++) {
    for(var x in adList) {
      if(l[i].href.includes(adList[x])) {
        l[i].parentNode.style.display = 'none';
      }
    }
  }
}


//remove images if their src contains an ad domain
function removeImages(adList) {
  var images = document.getElementsByTagName('img');
  for(var i = 0; i < images.length; i++) {
    for(var x in adList) {
      if(images[i].src.includes(adList[x])) {
        images[i].style.display = 'none';
      }
    }
  }
}

function removeIns() {
  var insTags = document.getElementsByTagName('ins');
  for(var i = 0; i < insTags.length; i++) {
    insTags[i].style.display = 'none';
  }
}

function removeIFrames() {
  //hard coded for now
  var iFrames = document.getElementsByTagName('iframe');
  for(var i = 0; i < iFrames.length; i++) {
    if(iFrames[i].id.includes("google_ads_iframe")) {
      iFrames[i].style.display = 'none';
      iFrames[i].parentNode.style.display = 'none';
    }
  }
}
