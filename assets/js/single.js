let issueContainerEl = document.querySelector("#issues-container");
let limitWarningEl = document.querySelector("#limit-warning");

let displayWarning = repo => {
    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    let linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    limitWarningEl.append(linkEl);
}

let displayIssues = issues => {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    
    for (let i = 0; i < issues.length; i++) {
        let issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        let titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;
        issueEl.append(titleEl);

        let typeEl = document.createElement("span");
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        issueEl.append(typeEl);

        issueContainerEl.append(issueEl);
    }
}

let getRepoIssues = repo => {
    let apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(response => {
        if (response.ok) {
            response.json().then(data => {
                displayIssues(data);

                if (response.headers.get("Link")) {
                    displayWarning(repo);
                }
            })
        } else {
            alert("There was a problem with your request!");
        }
    });
}

getRepoIssues("facebook/react");