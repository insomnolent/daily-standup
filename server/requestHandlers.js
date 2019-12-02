const configManager = require('./configManager')
const githubService = require('./githubService')

exports.getPullRequests = (req, res) => {
  const config = configManager.getConfig()
  githubService
    .loadPullRequests()
    .then(prs => {
      res.status(200).json({
        pullRequests: prs,
        repos: config.repos,
        title: config.title
      })
    })
    .catch(error => {
      console.error(`Error loading pull requests: ${error.message}`)
      console.error(error)
      res.status(500).json({
        error: `Failed to load pull requests: ${error.message}`
      })
    })
}

exports.getConfig = (req, res) => {
  const config = configManager.getConfig()
  const sanitisedConfig = Object.assign({}, config)

  sanitisedConfig.username = ''
  sanitisedConfig.password = ''
  sanitisedConfig.token = ''

  res.status(200).json(sanitisedConfig)
};

exports.updateConfig = (req, res) => {
  configManager.updateConfig(req.body);
  res.status(200).json('updated');
};

exports.repoExists = (req, res) => {
  githubService
    .getRepo(req.query.owner, req.query.repo)
    .then(() => {
      res.status(200).json(true);
    })
    .catch(() => {
      res.status(404).json(false);
    });
};
