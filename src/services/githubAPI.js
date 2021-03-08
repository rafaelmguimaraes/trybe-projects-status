import { Octokit } from '@octokit/rest';

const OWNER = 'Tryber';

export const getAllTeams = async () => {
  const octokit = new Octokit({ auth: process.env.REACT_APP_PERSONAL_GITHUB_TOKEN });
  const teams = await octokit.paginate('GET /orgs/{org}/teams', {
    org: OWNER,
  });
  return teams.filter(({ name }) => name.includes('students-sd-'));
};

export const getAllReposByTeam = async (teamName) => {
  const octokit = new Octokit({ auth: process.env.REACT_APP_PERSONAL_GITHUB_TOKEN });
  const repos = await octokit.paginate('GET /orgs/{org}/teams/{team_slug}/repos', {
    org: OWNER,
    team_slug: teamName,
  });
  return repos;
};

export const getAllPullsByRepo = async (repo) => {
  const octokit = new Octokit({ auth: process.env.REACT_APP_PERSONAL_GITHUB_TOKEN });
  const pulls = await octokit.paginate('GET /repos/{owner}/{repo}/pulls', {
    owner: OWNER,
    repo,
  });
  return pulls;
};

export const getAllCommentsByPull = async (repo, pullNumber) => {
  const octokit = new Octokit({ auth: process.env.REACT_APP_PERSONAL_GITHUB_TOKEN });
  const comments = await octokit
    .paginate('GET /repos/{owner}/{repo}/issues/{issue_number}/comments', {
      owner: OWNER,
      repo,
      issue_number: pullNumber,
    });
  return comments;
};

export const getUserInfo = async (username) => {
  const octokit = new Octokit({ auth: process.env.REACT_APP_PERSONAL_GITHUB_TOKEN });
  const { data } = await octokit
    .request('GET /users/{username}', {
      username,
    });
  return data;
};
