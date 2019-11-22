import React from 'react';
import rats from './img/rats.png';
import './App.css';

const callBackendAPI = async () => {
  const response = await fetch('/express_backend')
  const body = await response.json()

  if (response.status !== 200) {
    throw Error(body.message) 
  }
  return body;
}

function App() {
  callBackendAPI().then(res => console.log(res)).catch(err => console.log(err))

  return (
    <div className="App">
      <header className="App-header">
        <img src={rats} className="App-logo" alt="logo" />
        <p>
          Daily Standup Tool
        </p>
      </header>
    </div>
  );
}

export default App;
