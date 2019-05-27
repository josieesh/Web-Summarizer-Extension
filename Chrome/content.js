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
      var html = (document.getElementsByTagName('html')[0].innerHTML);
      console.log(html);
      // Proceeds to read all text content and send back to background.js
      chrome.runtime.sendMessage({"message": "getSummary", "text": html}, function(response) {
        // Parse the response from the server
        var summary = JSON.stringify(response);
        storeSummary(summary);
        chrome.runtime.sendMessage({"message":"returnSummary", "content": summary});
      });
    }
    else if(request.message === 'getFromStorage') {
      sendResponse(getFromStorage());
    }
  }
);

function storeSummary(summary) {
  // Put into session storage
  sessionStorage.setItem('summary', summary);
}

function getFromStorage() {
  //console.log(sessionStorage.getItem('summary'));
  return sessionStorage.getItem('summary');
}

