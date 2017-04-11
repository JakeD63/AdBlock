//start by loading in ad file
//NOTE: right now, the file will get loaded each time you load a page
//later I plan on moving this to a global object that is persistend across
//all pages, so we only load the file once


readAdList(chrome.runtime.getURL("adlist.txt"));

//gets adList and then calls routine to remove ads
//after async call is finished
function readAdList(filepath) {
  readFile(filepath, function(contents) {
    var adList = contents.split('\n');
    removeAds(adList);
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

//walks page removing any element with a source matching one from adList array
function removeAds(adList) {
  var links = [], l = document.links;
  for (var i = 0; i < l.length; i++) {
    for (var x in adList) {
      if(l[i].href.includes(adList[x])) {
        l[i].parentNode.style.display = 'none';
        console.log(x);
      }
    }
  }
}
