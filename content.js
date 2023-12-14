chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "clicked_browser_action") {
    //get how many commits there are in repo
    let gitStatsElement = document.querySelectorAll(
      "react-partial[partial-name='repos-overview'][data-ssr='false']"
    );

    let gitStatsInnerHTML = gitStatsElement[0].firstElementChild.innerHTML;

    let repo_data = JSON.parse(gitStatsInnerHTML);

    console.log(repo_data);

    var numberOfCommits = repo_data.props.initialPayload.overview.commitCount;
    console.log(numberOfCommits.replace(/,/g, ""), "mlem");
    var last_commit_string = repo_data.props.initialPayload.refInfo.currentOid;
    var branch_name = repo_data.props.initialPayload.refInfo.name;
    var repo_name = repo_data.props.initialPayload.repo.name;
    var repo_owner = repo_data.props.initialPayload.repo.ownerLogin;
    console.log(branch_name);
    // if it is a valid page, send number of commits - 2
    if (gitStatsElement) {
      sendResponse([
        repo_owner,
        repo_name,
        branch_name,
        last_commit_string,
        numberOfCommits.replace(/,/g, "") - 2,
      ]);
    } else {
      sendResponse("data not found");
    }
  }
});
