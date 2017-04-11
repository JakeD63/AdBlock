window.onload = function(){
  document.getElementById('scrape').addEventListener('click', scrapeSite);
}

function scrapeSite() {
  chrome.tabs.getSelected(null, function(tab) {
  chrome.tabs.sendRequest(tab.id, {function: "scrape"}, function(response) {
     alert(response.message);
  });
 });
}