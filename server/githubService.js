const axios = require('axios')
const configManager = require('./configManager')
const reviews = require('./reviews')
const moment = require('moment')

const apiCall = (url, headers = {}) => {
  const config = configManager.getConfig()
  const options = { headers }
  if (config.username && config.password) {
    options.auth = {
      username: config.username,
      password: config.password
    }
  } else if (config.token ) {
    options.auth = {
      username: config.token 
    }
  }
  return axios.get(url, options)
}

const checkLastDay = mergedTime => {
  // TODO: change back to 24 hrs - set it to last 14 days just for testing purposes
  const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000 * 14
  const mergedTimeInUnix = parseInt(moment(mergedTime).format('x'))
  return (Date.now() - Math.abs(mergedTimeInUnix)) < twentyFourHoursInMilliseconds 
}
const getPullRequests = repos => {
  const config = configManager.getConfig()

  const promises = repos.map(repo => apiCall(`${config.apiBaseUrl}/repos/${repo}/pulls?state=all&sort=updated&direction=desc`))
  return Promise.all(promises).then(results => {
    let pullRequests = []
    if (results[0] && results[0].data) {
      pullRequests = results[0].data.filter(result => {
        return result.state === 'open' || (result.state === 'closed' && result.merged_at && checkLastDay(result.merged_at))
      })
    }
    return pullRequests.map(pr => ({
      url: pr.html_url,
      id: pr.id,
      number: pr.number,
      title: pr.title,
      repo: pr.base.repo.full_name,
      repoUrl: pr.base.repo.html_url,
      repoId: pr.base.repo.id,
      user: {
        username: pr.user.login,
        profileUrl: pr.user.html_url,
        avatarUrl: pr.user.avatar_url
      },
      created: pr.created_at,
      updated: pr.updated_at,
      comments_url: pr.comments_url,
      statuses_url: pr.statuses_url,
      state: pr.state
    }))
  })
}

const getPullRequestStatus = pr => {
  return apiCall(pr.statuses_url).then(statuses => {
    if (statuses.data.length) {
      pr.status = {
        state: statuses.data[0].state,
        description: statuses.data[0].description
      };
    }
    delete pr.statuses_url;
  });
}

const getPullRequestReviews = pr => {
  const config = configManager.getConfig();
  return apiCall(`${config.apiBaseUrl}/repos/${pr.repo}/pulls/${pr.number}/reviews`).then(reviewData => {
    if (reviewData.data.length) {
      pr.positiveComments += reviews.countReviews(reviewData.data, 'APPROVED')
      pr.negativeComments += reviews.countReviews(reviewData.data, 'CHANGES_REQUESTED')
    }
  });
}

const prIsStale = pr => {
  const currentDate = new Date()
  const staleHours = configManager.getConfig().mergeRule.staleHours
  if (staleHours > 0) {
    const hoursBack = currentDate.getHours() - staleHours
    const previousDate = currentDate.setHours(hoursBack)
    return new Date(pr.created).getTime() < previousDate
  }
  return false
}

exports.getRepo = (owner, name) => {
  const config = configManager.getConfig()
  return apiCall(`${config.apiBaseUrl}/repos/${owner}/${name}`);
};

exports.loadPullRequests = () => {
  const config = configManager.getConfig()
  const repos = config.repos

  return getPullRequests(repos).then(prs => {
    const reviewPromises = prs.map(pr => getPullRequestReviews(pr))
    return Promise.all(reviewPromises).then(() => prs)
  })
  .then(prs => {
    const statusPromises = prs.map(pr => getPullRequestStatus(pr));
    return Promise.all(statusPromises).then(() => {
      prs.sort((p1, p2) => new Date(p2.updated).getTime() - new Date(p1.updated).getTime());
      if (configManager.hasMergeRules()) {
        prs.forEach(pr => {
          if (config.mergeRule.neverRegexp && configManager.getNeverMergeRegexp().test(pr.title)) {
            pr.unmergeable = true
          } else if (pr.positiveComments >= config.mergeRule.positive &&
            pr.negativeComments <= config.mergeRule.negative) {
            pr.mergeable = true
          } else if (prIsStale(pr)) {
            pr.stale = true
          }
        })
      }
      return prs
    })
  })
}
