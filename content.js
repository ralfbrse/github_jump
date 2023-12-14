chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "clicked_browser_action") {
    //get how many commits there are in repo
    const gitStatsElement = Array.from(document.querySelectorAll("*")).find(
      (el) => el.innerText === "Git stats"
    );
    stat_container = gitStatsElement.parentNode;
    const commits_text = stat_container.querySelector("strong").innerText;
    const commits = Number(commits_text.replace(/,/g, ""));

    const commitBuildStatuses = document.querySelector(
      ".commit-build-statuses"
    );
    const last_commit = commitBuildStatuses.getAttribute("data-url");
    const last_commit_string = last_commit.match(/commit\/(.*?)\/rollup/)[1];

    // if it is a valid page, send number of commits - 2
    if (gitStatsElement) {
      sendResponse([last_commit_string, commits - 2]);
    } else {
      sendResponse("no git stats element found");
    }
  }
});
