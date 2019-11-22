import React from 'react'
import rats from '../img/rats.png'
import { connect } from 'react-redux'
import { simpleAction } from '../actions/simpleAction'

import '../css/App.css'

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

function App(props) {
  callBackendAPI().then(res => console.log(res)).catch(err => console.log(err));
  
  const simpleAction = event => {
    props.simpleAction()
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={rats} className="App-logo" alt="logo" />
        <p>
          Daily Standup Tool
        </p>
        <pre>{JSON.stringify(props)}</pre>
        <button onClick={simpleAction}>Test redux action</button>
      </header>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)