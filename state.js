//on page load, check state of disable checkbox
document.addEventListener('DOMContentLoaded', init, false);
var disableCheck;

function init() {
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