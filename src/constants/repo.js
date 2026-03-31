const GITHUB_REPO_BASE = "https://github.com/jhonatasfender/nagham";

export const githubRepoBaseUrl = GITHUB_REPO_BASE;

export function getGithubIssuesUrl() {
  return `${GITHUB_REPO_BASE}/issues`;
}
