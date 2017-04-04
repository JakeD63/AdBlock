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
