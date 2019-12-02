import React from 'react'
import rats from '../img/rats.png'
import { connect } from 'react-redux'
import { simpleAction } from '../actions/simpleAction'

import '../css/App.scss'

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
 })

const mapStateToProps = state => ({
  ...state
})

const callBackendAPI = async () => {
  const response = await fetch('/express_backend')
  const body = await response.json()

  if (response.status !== 200) {
    throw Error(body.message) 
  }
  return body
}

function Example(props) {
  callBackendAPI().then(res => console.log(res)).catch(err => console.log(err));
  
  const simpleAction = event => {
    props.simpleAction()
  }

  return (
    <div className="daily-standup">
        <img src={rats} className="App-logo" alt="logo" />
        <p>
          Example
        </p>
        <pre>{JSON.stringify(props)}</pre>
        <button onClick={simpleAction}>Test redux action</button>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Example)

/**
 * simpleAction.js
 */

// export const simpleAction = () => dispatch => {
//   dispatch({
//    type: 'SIMPLE_ACTION',
//    payload: 'result_of_simple_action'
//   })
//  }

/**
 * rootReducer.js
 */

// import { combineReducers } from 'redux'
// import simpleReducer from './simpleReducer'

// export default combineReducers({
//  simpleReducer
// })

/**
 * simpleReducer.js
 */

// export default (state = {}, action) => {
//   switch (action.type) {
//    case 'SIMPLE_ACTION':
//     return {
//      result: action.payload
//     }
//    default:
//     return state
//   }
//  }