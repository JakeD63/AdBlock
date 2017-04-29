//FILE: state.js
//This file handles the state of the options menu in the extension window.
//It uses event listeners and Chrome's storage API to store user settings 
//across browsing sessions.


//on page load, check state of disable checkbox
document.addEventListener('DOMContentLoaded', init, false);
//globals used in many functions
var disableCheck, whitelistCheck; //check elements on html page
var url; //url of current tab (not of extension page)

function init() {
	disableHandler();
		//need url for whitelist handling
		chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
		//get base url
		var pathArray = tabs[0].url.split( '/' );
		url = pathArray[0] + '//' + pathArray[2];
		whitelistHandler();
	});
}

//sets default disable check state
//adds listener to disable checkbox
function disableHandler() {
	//add listener for checkbox (no inline js allowed)
	disableCheck = document.getElementById('disable');
	disableCheck.addEventListener("click", toggleDisable);
	//set checkbox initial state from storage
	chrome.storage.sync.get('disable', function(response) {
		disableCheck.checked = response.disable;
	});
}

//update disable state
function toggleDisable() {
	if(disableCheck.checked) {
		chrome.storage.sync.set({'disable': true});
	} else {
		chrome.storage.sync.set({'disable': false});
	}
}

//sets default value of whitelist checkbox
//ads listener to whitelist box
function whitelistHandler() {
	//add listener to whitelist checkbox
	whitelistCheck = document.getElementById('whitelist');
	whitelistCheck.addEventListener("click", toggleWhitelist);
	//set whitelist checkbox initial state from local storage
	chrome.storage.sync.get('whitelist', function(response) {
		//if the whitelist is not empty
		if(response.whitelist) {
			//walk the whitelist looking for the current tab url
			for(var i = 0; i < response.whitelist.length; i++) {
				if(response.whitelist[i] == url) {
					whitelistCheck.checked = true;
					break;
				}
				else
					whitelistCheck.checked = false;
			}
		//if the array is empty, the current tab cannot be whitelisted
		} else
			whitelistCheck.checked = false;
	});
}

//updates whitelist when user checks box
function toggleWhitelist() {
	//get current whitelist from storage
	chrome.storage.sync.get('whitelist', function(response) {
		//if the array exists in storage
		if(response.whitelist) {
			//if they checked the box, update the whitelist
			if(whitelistCheck.checked) {
				response.whitelist.push(url);
			} else {
				//if they unchecked the box, remove url from whitelist
				var found = response.whitelist.indexOf(url);
	    		while (found !== -1) {
	        		response.whitelist.splice(found, 1);
	        		found = response.whitelist.indexOf(url);
	    		}
			}
			//store back modified whitelist
			chrome.storage.sync.set({'whitelist': response.whitelist});
		} else {
			//if the array was empty and the box was checked
			if(whitelistCheck.checked) {
				//create array with singel element (url), and store
				var list = [];
				list.push(url);
				chrome.storage.sync.set({'whitelist': list});
			}
		}
	});
}