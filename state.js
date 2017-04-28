//on page load, check state of disable checkbox
document.addEventListener('DOMContentLoaded', init, false);
var disableCheck, whitelistCheck;
var url;

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

function whitelistHandler() {
	whitelistCheck = document.getElementById('whitelist');
	whitelistCheck.addEventListener("click", toggleWhitelist);
	chrome.storage.sync.get('whitelist', function(response) {
		if(response.whitelist) {
			for(var i = 0; i < response.whitelist.length; i++) {
				if(response.whitelist[i] == url) {
					whitelistCheck.checked = true;
					break;
				}
				else
					whitelistCheck.checked = false;
			}
		} else
			whitelistCheck.checked = false;
	});
}

function toggleWhitelist() {
	chrome.storage.sync.get('whitelist', function(response) {
		if(response.whitelist) {
			if(whitelistCheck.checked) {
				response.whitelist.push(url);
			} else {
				var found = response.whitelist.indexOf(url);
	    		while (found !== -1) {
	        		response.whitelist.splice(found, 1);
	        		found = response.whitelist.indexOf(url);
	    		}
			}
			chrome.storage.sync.set({'whitelist': response.whitelist});
		} else {
			if(whitelistCheck.checked) {
				var list = [];
				list.push(url);
				chrome.storage.sync.set({'whitelist': list});
			}
		}
	});
}