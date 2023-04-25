

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "updateMinFollowers") {
    chrome.storage.sync.set({ minFollowersInput: request.value }, function() {
      console.log("Minimum followers updated:", request.value);
    });
  }
});
