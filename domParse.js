var observer = new MutationObserver(parse);
observer.observe(document, {subtree:true, childList:true});
document.addEventListener('DOMContentLoaded', function() { observer.disconnect() });

function parse(mutations) {

	//call scrape routine in case callback returns after partial DOM load

	for(var i = 0; i < mutations.length; i++) {
		var addedNodes = mutations[i].addedNodes;
		for(var j = 0; j < addedNodes.length; j++) {
			var curNode = addedNodes[j];
			//process each node
			scrapeNode(curNode);
		}
	}
}

function scrapeNode(node) {
	//switch based on node.nodeName
}

	

//removes node element from page
function deleteElement(element) {
  element.outerHTML = "";
  delete element;
  //element.parentElement.removeChild(element);
}
