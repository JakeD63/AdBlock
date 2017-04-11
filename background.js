var meta = document.createElement('meta');
meta.httpEquiv = "Content-Security-Policy";
meta.content = "script-src 'self'";
document.getElementsByTagName('head')[0].appendChild(meta);


//start by loading in ad file
//NOTE: right now, the file will get loaded each time you load a page
//later I plan on moving this to a global object that is persistend across
//all pages, so we only load the file once

//recieve message from popup.js
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if(request.function === 'scrape') {
    readAdList(chrome.runtime.getURL("adlist.txt"), 4);
  }
});

//gets adList and then calls routine to remove ads
//after async call is finished
function readAdList(filepath, cutoffLength) {
  readFile(filepath, function(contents) {
    var adList = contents.split('\n');
    //remove domain and urls that are way too short
    for(var i in adList) {
      //adList[i] = adList[i].substring(0, adList[i].lastIndexOf('.'));
      if(adList[i].length <= cutoffLength)
        adList.splice(i, 1);
    }
    removeAds(adList)
  });
  //TODO: call removeAds with user list
  //here since user list does not rely on async
}

//read file w/async
function readFile(filepath, callback) {
  var file = new XMLHttpRequest();
  file.open("GET", filepath, true);
  file.onload = function(e) {
    if (file.readyState === 4) {
      if(file.status === 200)
        callback(file.responseText);
      } else {
        console.error(xhr.statusText);
      }
    }
  file.send(null);
}

function removeAds(adList) {
  removeLinks(adList);
  removeImages(adList);
  console.log("Done Scraping");
}

//walks page removing any element with a source matching one from adList array
function removeLinks(adList) {
  var links = [], l = document.links;
  for(var i = 0; i < l.length; i++) {
    for(var x in adList) {
      if(l[i].href.includes(adList[x])) {
        console.log("Detected URL:" + (x) + ": " + l[i].href);
        l[i].parentNode.style.display = 'none';
      }
    }
  }
}

//remove images if their src contains an ad domain
function removeImages(adList) {
  var images = document.getElementsByTagName('img');
  for(var i = 0; i < images.length; i++) {
    console.log(images[i].src);
    for(var x in adList) {
      if(images[i].src.includes(adList[x])) {
        console.log("Detected Img Src:" + (x) + ": " + l[i].href);
        l[i].style.display = 'none';
      }
    }
  }
}