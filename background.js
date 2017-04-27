document.addEventListener('DOMContentLoaded', function() {
  removeAds(adArray);
  removeAds(adArray);
}, false);

function removeAds(adList) {
  removeLinks(adList);
  removeImages(adList);
  removeNonMatchingImgTags(adList);
  removeIns();
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
		if(!(imgtags[i].src.includes(window.location.href))) {
			imgtags[i].style.display = 'none';
		}
  }
}

function removeIns() {
  var insTags = document.getElementsByTagName('ins');
  for(var i = 0; i < insTags.length; i++) {
    deleteElement(insTags[i]);
  }
}

//removes node element from page
function deleteElement(element) {
  element.parentElement.removeChild(element);
}
