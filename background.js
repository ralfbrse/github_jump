chrome.action.onClicked.addListener((tab) => {
  var url = tab.url;

  chrome.tabs
    .sendMessage(tab.id, {
      message: "clicked_browser_action",
    })
    .then((result) => {
      console.log(result);
      const new_url =
        tab.url + "/commits/main?after=" + result[0] + "+" + result[1];
      chrome.tabs.update(tab.id, { url: new_url });
    })
    .catch((err) => {});
  // do something with response here, not outside the function
});
