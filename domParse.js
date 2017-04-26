var observer = new MutationObserver(parse);
observer.observe(document, {subtree:true, childList:true});
document.addEventListener('DOMContentLoaded', function() { observer.disconnect() });

function parse(mutations) {

	//call scrape routine in case callback returns after partial DOM load
	for(var i = 0; i < mutations.length; i++) {
		var addedNodes = mutations[i].addedNodes;
		for(var j = 0; j < addedNodes.length; j++) {
			var n = addedNodes[j];
			if(n.nodeType == 1) {
				scrapeNode(n);
			}	

		}
	}
}

function scrapeNode(node) {
	//switch based on node.tagName
	switch (node.tagName) {
		case 'BODY':
			parseBody(node);
			break;
		case "IFRAME":
			scrapeIFrame(node);
			break;
		default:
			//console.log(node);
			break;
	}
}

//body nodes can be parsed as iFrames
//this is not the same as the other iFrames we block
function parseBody(bodyNode) {
	var iframe = bodyNode.children;
	console.log(iframe);
}

function scrapeLink(node) {
	for(var i = 0; i < adArray.length; i++) {
		if(node.href.includes(adArray[i])) {
			deleteElement(node);
			break;
		}
	}
}

function scrapeImg(node) {

	for(var i = 0; i < adArray.length; i++) {
		if(node.src.includes(adArray[i])) {
			deleteElement(node);
			break;
		}
	}
}

function scrapeIns(node) {
	deleteElement(node);

}

function scrapeIFrame(node) {
	deleteElement(node);
}
	



//removes node element from page
function deleteElement(element) {
  element.outerHTML = "";
  delete element;
  //element.parentElement.removeChild(element);
}
