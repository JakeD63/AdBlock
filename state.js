document.addEventListener('DOMContentLoaded', init, false);
var disableCheck;
function init() {
	disableCheck = document.getElementById('disable');
	disableCheck.addEventListener("click", toggleDisable);
	chrome.storage.sync.get('disable', function(response) {
		disableCheck.checked = response.disable;
	});
}

//store if the user has disabled the extension
function toggleDisable() {
	if(disableCheck.checked) {
		chrome.storage.sync.set({'disable': true});
	} else {
		chrome.storage.sync.set({'disable': false});
	}
}