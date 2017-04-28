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

function parse_init() {
    var observer = new MutationObserver(parse);
    observer.observe(document, { subtree: true, childList: true });
}

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


function scrapeIFrame(node) {
    deleteElement(node);
}

function scrapeScript(node) {
    //in content script, so we can do this
    var src = node.src.toLowerCase();
    //check if url is OK
    //look through adArray for matching src
    for (var i = 0; i < adArray.length; i++) {
        if (src.includes(adArray[i]) || node.innerHTML.includes(adArray[i])) {
            deleteElement(node);
        }
    }
}
