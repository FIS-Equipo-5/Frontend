import React from 'react';
import Transfers from './transfers/Transfers.js';
import Matches from './tournaments/Matches'
import Authenticate from './auth/Authenticate.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

function App() {
  console.log('token',localStorage.getItem("authToken"));
  if(localStorage.getItem("authToken") == "undefined" || localStorage.getItem("authToken") == null){
return (<Authenticate/>);
  }else{
  
  return (
    <div id="app">
      <h1>Football App</h1>
      <div id="transfers">
        <h2>Transfers: </h2>
        <Transfers />
      </div>


      <div id="tournamentsMS" class="row">
        <div id="tournamens" class="col-6">
          <h2>Tournaments: </h2>
          {/* <Tournaments /> */}
        </div>
        <div id="matches" class="col-6">
          <h2>Matches: </h2>
          <Matches />
        </div>
      </div>
    </div>
  );
  }
}

export default App;
