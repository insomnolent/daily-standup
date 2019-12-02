import React, { useContext, useEffect } from 'react'
import { store } from '../store'
import { loadPullRequests } from '../actions'

import '../css/App.scss'

const DailyStandup = props => {  
  const globalState = useContext(store)
  console.log('before', globalState.state)
  const { dispatch, state } = globalState

  useEffect(() => {
    !state.loading && loadPullRequests(dispatch)
  }, [])
  console.log('after', globalState.state)

  // TODO: clean up this mess of jsx when I have more time later
  return (
    <div className="daily-standup">
        <p>
          Daily Standup
        </p>
        {state.pullRequests.map(pr => {
          return (
            <div>
              {(pr.state === 'closed') ? (
                <div>
                  <p>Closed: <a href={pr.url}>{pr.title}</a>
                  </p>
                  
                </div>
              ) : (
                <div>
                  <p>Open: <a href={pr.url}>{pr.title}</a>
                  </p>
                  
                </div>
              )}
            </div>
          )
        })}

    </div>
  )
}

export default DailyStandup