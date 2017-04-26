//start by loading in ad file
//NOTE: right now, the file will get loaded each time you load a page
//later I plan on moving this to a global object that is persistend across
//all pages, so we only load the file once

//uncomment this to run scraper automatically
//start();

//recieve message from popup.js
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if(request.function === 'scrape') {
    //run twice because ads are shifty
    start();
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
  removeNonMatchingImgTags(adList);

  console.log("Done Scraping");
}

//walks page removing any element with a source matching one from adList array
function removeLinks(adList) {
  var links = [], l = document.links;
  for(var i = 0; i < l.length; i++) {
    for(var x in adList) {
      if(l[i].href.includes(adList[x])) {
        deleteElement(l[i]);
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
        deleteElement(images[i]);
      }
    }
  }
}


//remove images if their src contains an ad domain
function removeNonMatchingImgTags(adList) {
	var imgtags = document.getElementsByTagName('img');

	for(var i = 0; i < imgtags.length; i++) {
		if(  !( imgtags[i].src.includes(getCurrentTabURL())  )  ) {
			imgtags[i].style.display = 'none';
		}
  }
}


function getCurrentTabURL(){

	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
	    var url = tabs[0].url;
	});
	return url;

}




function removeIns() {
  var insTags = document.getElementsByTagName('ins');
  for(var i = 0; i < insTags.length; i++) {
    deleteElement(insTags[i]);
  }
}

function removeIFrames() {
  var iFrames = document.getElementsByTagName('iframe');
  for(var i = 0; i < iFrames.length; i++) {
      deleteElement(iFrames[i]);
  }
}

//removes node element from page
function deleteElement(element) {
  element.outerHTML = "";
  delete element;
  //element.parentElement.removeChild(element);
}
