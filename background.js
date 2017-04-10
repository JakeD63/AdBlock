readFile(chrome.runtime.getURL("adlist.txt"));
//read list of domains to blocks
function readFile(filepath) {
  var file = new XMLHttpRequest();
  file.open("GET", filepath, true);
  file.onload = function(e) {
    if (file.readyState === 4) {
      if(file.status === 200) {
        parseFile(file.responseText);
      } else {
        console.error(xhr.statusText);
      }
    }
  }
  file.send(null);
}

function parseFile(file) {
  console.log(file);
}

//iterate through all links on page
//if the link matches an ad, block it
function test() {
  var links = [], l = document.links;
  for (var i = 0; i < l.length; i++) {
    if(l[i].href.includes("ad")) {
      console.log(l[i].href);
      var parent = l[i].parentNode;
      parent.style.display = 'none';
    }
  }
}
