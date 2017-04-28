//FILE: domParse.js
//this file observes modifications made to the DOM
//and filters elements before they get served or executed.
//these modifications are recorded before anything is loaded,
//so we catch every element served to the page.

//check if extension is disabled or if domain is whitelisted
chrome.storage.sync.get(['disable', 'whitelist'], function(response) {
    //if extension is not disabled
    if (!response.disable) {
        //if whitelist is not empty
        if (response.whitelist) {
            //get base url
            var pathArray = window.location.href.split('/');
            var url = pathArray[0] + '//' + pathArray[2];
            if (response.whitelist.indexOf(url) == -1) {
                parse_init();
            }
            //else if whitelist is empty
        } else
            parse_init();
    }
});

//adds an observer to the page
function parse_init() {
    var observer = new MutationObserver(parse);
    observer.observe(document, { subtree: true, childList: true });
}

//callback for mutationobserver
//walks DOM changes looking for scrips and iframes
function parse(mutations) {
    //call scrape routine in case callback returns after partial DOM load
    for (var i = 0; i < mutations.length; i++) {
        var addedNodes = mutations[i].addedNodes;
        for (var j = 0; j < addedNodes.length; j++) {
            var n = addedNodes[j];
            if (n.nodeType == 1) {
                scrapeNode(n);
            }
        }
    }
}

//send node to appropriate handler
function scrapeNode(node) {
    //switch based on node.tagName
    switch (node.tagName) {
        case 'SCRIPT':
            scrapeScript(node);
            break;
        case "IFRAME":
            scrapeIFrame(node);
            break;
    }
}

//remove an iFrame
function scrapeIFrame(node) {
    deleteElement(node);
}

//remove script if in our array
//NOTE: we look through both the source code of script
//and code inside the tags if there is any
function scrapeScript(node) {
    //in content script, so we can do this
    var src = node.src.toLowerCase();
    //look through adArray for matching src or inner code
    for (var i = 0; i < adArray.length; i++) {
        if (src.includes(adArray[i]) || node.innerHTML.includes(adArray[i])) {
            deleteElement(node);
        }
    }
}