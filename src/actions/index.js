import axios from 'axios';

export const ActionTypes = {
  ADD_PULL_REQUESTS: 'ADD_PULL_REQUESTS',
  UPDATE_PULL_REQUEST: 'UPDATE_PULL_REQUEST',
  SET_FAILED_REPOS: 'SET_FAILED_REPOS',
  REFRESH: 'REFRESH',
  START_LOADING: 'START_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_REPOS: 'SET_REPOS',
  SET_TITLE: 'SET_TITLE',
  SORT: 'SORT'
};

export const setError = error => {
  return {
    type: ActionTypes.SET_ERROR,
    error
  };
}

export const setRepos = repos => {
  return {
    type: ActionTypes.SET_REPOS,
    repos
  };
}

export const setTitle = title => {
  return {
    type: ActionTypes.SET_TITLE,
    title
  }
}

export const addPullRequests = (pullRequests, sortOptions) => {
  return {
    type: ActionTypes.ADD_PULL_REQUESTS,
    pullRequests,
    sortOptions
  }
}

export const addFailedRepos = failedRepos => {
  return {
    type: ActionTypes.SET_FAILED_REPOS,
    failedRepos
  };
}

export const updatePullRequest = pullRequest => {
  return {
    type: ActionTypes.UPDATE_PULL_REQUEST,
    pullRequest
  };
}

export const addFailedRepo = failedRepo => {
  return {
    type: ActionTypes.ADD_FAILED_REPO,
    failedRepo
  };
}

export const loadPullRequests = dispatch => {
  dispatch({ type: ActionTypes.START_LOADING })
  const sortOptions = true
  return axios.get('/pulls').then(response => {
    dispatch(addPullRequests(response.data.pullRequests, sortOptions))
    dispatch(setRepos(response.data.repos));
    dispatch(setTitle(response.data.title || 'Pull Requests'));
  }).catch(() => {
    dispatch(setError('Failed to load pull requests. Double check that all your repos exist!'));
  })
}

export const refresh = () => {
  return {
    type: ActionTypes.REFRESH
  }
}

export const sort = ({ sortByRepo, orderBy }) => {
  return {
    type: ActionTypes.SORT,
    sortOptions: {
      sortByRepo,
      orderBy
    }
  }
}
