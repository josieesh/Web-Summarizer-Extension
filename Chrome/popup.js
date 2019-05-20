document.addEventListener('DOMContentLoaded', function() {
    var existingSummary = "";
    var body = document.body;
    
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) { 
        chrome.tabs.sendMessage(tabs[0].id, 
            {"message": "getFromStorage"}, function(response) {
                existingSummary = response ? JSON.parse(response).Summary : null;
                if (existingSummary) {
                    addSummaryToUI(existingSummary);
                }
        })
    });

    var summarizeButton = document.getElementById('summarize');
    
    summarizeButton.addEventListener('click', function() {chrome.tabs.query({
          active: true,
          currentWindow: true
      }, function(tabs) {
          var element = document.getElementById("daSummary");
          if(element.firstChild) element.removeChild(element.firstChild);
          console.log("Sending html...");
          document.getElementById("modal").classList.add("loading");
          chrome.tabs.sendMessage(tabs[0].id, {"message": "getSummary"}
          );      
      });
    });
  });

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {   
    if(message.message === "returnSummary") {
        document.getElementById("modal").classList.remove("loading");
        var summary = JSON.parse(message.content).Summary;
        addSummaryToUI(summary);
    }

});

function addSummaryToUI(summary) {
    console.log("Adding to ui");
    var para = document.createElement("p");

    var node = document.createTextNode(summary);

    para.appendChild(node);

    var element = document.getElementById("daSummary");

    // First remove any existing summary before adding new one
    if(element.firstChild) element.removeChild(element.firstChild);
    element.appendChild(para)
    element.style.display = "block";
}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }