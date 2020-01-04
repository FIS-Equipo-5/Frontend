import React from 'react';
import Transfers from './transfers/Transfers.js';
import Teams from './teams/Teams';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

function App() {

  const teams = [
    {
      "team_id": 541,
      "name": "Real Madrid",
      "code": 123,
      "logo": "https://media.api-football.com/teams/541.png",
      "country": "Spain",
      "founded": 1902,
      "venue_name": "Estadio Santiago Bernabéu",
      "venue_surface": "grass",
      "venue_address": "Avenida de Concha Espina 1, Chamartín",
      "venue_city": "Madrid",
      "venue_capacity": 85454,
	    "budget": 14423432,
	    "value": 9999999999999999999
    },
    {
      "team_id": 444,
      "name": "Real Betis",
      "code": 333,
      "logo": "https://media.api-football.com/teams/543.png",
      "country": "Spain",
      "founded": 1902,
      "venue_name": "Benito Villamarín",
      "venue_surface": "grass",
      "venue_address": "Avenida de Concha Espina 1, Chamartín",
      "venue_city": "Sevilla",
      "venue_capacity": 63000,
	    "budget": 14423432,
	    "value": 9999999999999999999
    }
  ]

  return (
    <div id="app">
      <h1>Football App</h1>
      {/* <div id="transfers">
          <h2>Transfers: </h2>
          <Transfers/>
      </div> */}
      <div id="teams">
          <h2>Teams: </h2>
          <Teams teams={teams}/>
      </div> 
    </div>
  );
}

export default App;