import React from 'react'
import DailyStandup from './DailyStandup'
import About from './About'
import Settings from './Settings'
import Error from './Error'
import NavBar from './NavBar'

import {useRoutes} from 'hookrouter'

import '../css/App.scss'

const routes = {
  '/': () => <DailyStandup />,
  '/about': () => <About />,
  '/settings': () => <Settings />
};

function App(props) { 
  const routeResult = useRoutes(routes)
  return (
    <div className="App">
        <NavBar />
      <div className="App-header">
        { routeResult || <Error /> }
      </div>
    </div>
  )
}

export default App
