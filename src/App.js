import React from 'react';
import Transfers from './transfers/Transfers.js';
import Teams from './teams/Teams';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

function App() {

  return (
    <div id="app">
      <h1>Football App</h1>
      {/* <div id="transfers">
          <h2>Transfers: </h2>
          <Transfers/>
      </div> */}
      <div id="teams">
          <h2>Teams: </h2>
          <Teams/>
      </div> 
    </div>
  );
}

export default App;