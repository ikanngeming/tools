chrome.runtime.onInstalled.addListener(() => {
  console.log('Web Panel Extension installed');
});

chrome.action.onClicked.addListener(async (tab) => {
  chrome.tabs.sendMessage(tab.id, { action: "togglePanel" }, (response) => {
    if (chrome.runtime.lastError) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      }, () => {
        setTimeout(() => {
          chrome.tabs.sendMessage(tab.id, { action: "togglePanel" });
        }, 100);
      });
    }
  });
});
