import React from 'react'
import ReactDOM from 'react-dom'
import { StateProvider } from './store'
import './index.css';
import App from './components/App'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <StateProvider>
    <App />
  </StateProvider>,
  document.getElementById('root')
)
serviceWorker.unregister()
