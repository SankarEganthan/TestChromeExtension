chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log(message.fswid);

  //send Message to Background scripts
  chrome.runtime.sendMessage({ greeting: "hello" }, function (message) {
    console.log(message.farewell);
  });
});
