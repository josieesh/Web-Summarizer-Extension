// Listens for message from background.js
//chrome.runtime.onMessage.addListener(
//    function(request, sender, sendResponse) {
//      if( request.message === "clicked_browser_action" ) {
//        var firstHref = $("a[href^='http']").eq(0).attr("href");
//  
//        console.log(firstHref);
//
//        // Tells background.js to open a new tab with the given url
//        chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
//      }
//    }
//  );


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.message === "getSummary") {
      var html = new XMLSerializer().serializeToString(document);
      // Proceeds to read all text content and send back to background.js
      chrome.runtime.sendMessage({"message": "getSummary", "text": html}, function(response) {
        console.log(response);
        var summary = JSON.stringify(response);
        chrome.runtime.sendMessage({"message":"returnSummary", "content": summary});
      });
    }
  }
);

