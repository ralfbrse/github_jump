chrome.action.onClicked.addListener((tab) => {
  // #FIXME: If there is only one commit
  // #FIXME: If there are no commits
  // #FIXME: not on main branch fixed :)
  var url = tab.url;
  chrome.tabs
    .sendMessage(tab.id, {
      message: "clicked_browser_action",
    })
    .then((result) => {
      console.log(result);
      const new_url =
        "https://github.com/" +
        result[0] +
        "/" +
        result[1] +
        "/commits/" +
        result[2] +
        "?after=" +
        result[3] +
        "+" +
        result[4];
      chrome.tabs.update(tab.id, { url: new_url });
      console.log(new_url);
    })
    .catch((err) => {});
});
