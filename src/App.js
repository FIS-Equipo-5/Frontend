import React from 'react';
import Transfers from './transfers/Transfers.js';
import Players from './players/Players.js';
import Teams from './teams/Teams';
import TournamentsParent from './tournaments/TournamentsParent';
import Authenticate from './auth/Authenticate.js';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Menu from './common/Menu';
import Footer from './common/Footer'



function App() {
  if(localStorage.getItem("authToken") === "undefined" || localStorage.getItem("authToken") === null){
    return (<Authenticate/>);
  }else{
    return (
      <div id="app">
        <Menu />
        <div id="transfers">
          <h2>Transfers </h2>
          <Transfers />
        </div>
        
        <div id="teams" style={{marginBottom: "5%", marginTop: "5%"}}>
          <Teams/>
        </div> 

        <div id="players" style={{marginBottom: "5%", marginTop: "5%"}}>
          <h2>Players </h2>
          <Players/>
        </div> 
        <TournamentsParent/>
        <Footer />

      </div>
    );
  }

}

export default App;