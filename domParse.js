var observer = new MutationObserver(parse);

function parse(mutions) {
	for(var i = 0; i < mutations.length(); i++) {
		var addedNodes = mutations[i].addedNodes;
		for(var j = 0; j < addedNodes.length(); j++) {
			var curNode = addedNodes[j];
			console.log(curNode);
		}
	}
}