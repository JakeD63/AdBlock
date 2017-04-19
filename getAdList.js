//getAdList.js
//routines for loading adList into array of domains

//gets adList and then calls routine to remove ads
//after async call is finished
function readAdList(filepath, cutoffLength, callback) {
  readFile(filepath, function(contents) {
    var adList = contents.split('\n');
    //remove domain and urls that are way too short
    for(var i in adList) {
      //adList[i] = adList[i].substring(0, adList[i].lastIndexOf('.'));
      if(adList[i].length <= cutoffLength)
        adList.splice(i, 1);
    }
    callback(adList);
  });
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
