//block requests that match domain from ad list
chrome.webRequest.onBeforeRequest.addListener( function(details) {
  return {cancel: true};
  },
  {urls: adArray},
  ["blocking"]);

//block all iframes

chrome.webRequest.onBeforeRequest.addListener(function(details) {
		alert("test");
       return {cancel: true};
}, {
    urls: ['*://*/*'],
    types: ['sub_frame']
}, ['blocking']);