# daily-standup

To configure this project, copy `config/config.sample.json` to `config/config.json`. If you're looking at PRs in public Github, you don't need to change the `apiBaseUrl`, but if it's GitHub Enterprise then it needs to be something like `https://github.<company>.com/api/v3`. To use the GitHub Personal Access Token for accessing private repositories, username and password lines in `config/config.json` can be replaced with a single "token": "MY_PERSONAL_TOKEN" line.

GitHub places a very strict rate limit on unauthenticated requests. If you run into this problem, you will need to add your GitHub username and password in `config.json`.

To start, run `npm install` and `npm run start`, and also `node server/index.js` for the express server.

Based off of this existing repo for viewing PRs across multiple repos: https://github.com/joeattardi/github-pr-dashboard 