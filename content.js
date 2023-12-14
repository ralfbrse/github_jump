chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "clicked_browser_action") {
    //get how many commits there are in repo
    let gitStatsElement = document.querySelectorAll(
      "react-partial[partial-name='repos-overview'][data-ssr='false']"
    );

    let gitStatsInnerHTML = gitStatsElement[0].firstElementChild.innerHTML;

    let repo_data = JSON.parse(gitStatsInnerHTML);

    var numberOfCommits = repo_data.props.initialPayload.overview.commitCount;
    var last_commit_string = repo_data.props.initialPayload.refInfo.currentOid;
    // if it is a valid page, send number of commits - 2
    if (gitStatsElement) {
      sendResponse([last_commit_string, numberOfCommits - 2]);
    } else {
      sendResponse("data not found");
    }
  }
});
