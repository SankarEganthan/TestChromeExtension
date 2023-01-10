chrome.runtime.onInstalled.addListener(() => {
  //create context menu
  chrome.contextMenus.create({
    id: "TieOut",
    title: 'Start Tie Out "%s"',
    type: "normal",
    contexts: ["selection"],
  });

  chrome.bookmarks.onCreated.addListener(function () {
    console.log("A bookmark was created");
  });
});
//listener for context menu
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  const fswidNo = info.selectionText;

  //the URL that will be added to based on the selection
  // const newURL = "https://www.google.com/" + info.selectionText;
  //create the new URL in the user's browser
  //chrome.tabs.create({ url: newURL });

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { fswid: fswidNo });
  });

  //receiving a message
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    console.log(
      sender.tab
        ? "from a content script:" + sender.tab.url
        : "from the extension"
    );
    if (request.greeting === "hello") sendResponse({ farewell: "goodbye" });
  });
});
