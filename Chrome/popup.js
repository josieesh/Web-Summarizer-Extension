document.addEventListener('DOMContentLoaded', function() {
    var summarizeButton = document.getElementById('summarize');
    
    summarizeButton.addEventListener('click', function() {
        var existingSummary = document.getElementById("daSummary");
        while (existingSummary.firstChild) {
            existingSummary.removeChild(existingSummary.firstChild);
        }

        chrome.tabs.query({
          active: true,
          currentWindow: true
      }, function(tabs) {
          console.log("Sending html...");
          chrome.tabs.sendMessage(tabs[0].id, {"message": "getSummary"}
          );
      });
    });
  });

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if(message.message === "returnSummary") {
        var summary = JSON.parse(message.content).Summary;
        
        var para = document.createElement("p");

        var node = document.createTextNode(summary);

        para.appendChild(node);

        var element = document.getElementById("daSummary");

        element.appendChild(para)
        element.style.display = "block";
    }

});