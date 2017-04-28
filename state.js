//on page load, check state of disable checkbox
document.addEventListener('DOMContentLoaded', init, false);
var disableCheck, whitelistCheck;

function init() {
	disableHandler();
	whitelistHandler();
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
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
		//get base url
		var pathArray = tabs[0].url.split( '/' );
		var url = pathArray[0] + '//' + pathArray[2];
    	chrome.storage.sync.get('whitelist', function(response) {
			for(var i = 0; i < response.whitelist.length; i++) {
				if(response.whitelist[i] == url)
					whitelistCheck.checked = true;
				else
					whitelistCheck.checked = false;
			}
		});
	});
	
}

function toggleWhitelist() {
	if(whitelistCheck.checked) {
		//add to whitelist
	} else {
		//remove from whitelist
	}
}