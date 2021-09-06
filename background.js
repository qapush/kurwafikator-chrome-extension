const level = 4; 

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ level });
});

chrome.contextMenus.create({
  title: "Kurwafikacja",
  visible: true,
  id: "kurwa",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener((clickData) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { text: clickData.selectionText });
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  
  if (changeInfo.status === "complete") {
    // INJECT CSS
    chrome.scripting
      .insertCSS({
        files: ["./front.css"],
        target: {
          tabId: tabId,
        },
      })
      .then(() => {
        console.log("STYLES INJECTED");
        // INJECT SCRIPT
        chrome.scripting
          .executeScript({
            files: ["./front.js"],
            target: {
              tabId: tabId,
            },
          })
          .then(console.log("SCRIPT INJECTED"));
      });
  }
});
