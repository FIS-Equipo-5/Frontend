import React from 'react';
import Transfers from './transfers/Transfers.js';
import Players from './players/Players.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

const players = [{
  goals: {
      total: 48,
      assists: 51
  },
  cards: {
      yellow: 1,
      red: 0
  },
  _id: "5e1094f089977e00b0bd04bc",
  player_name: "Sergio",
  firstname: "Ramos",
  lastname: "Rodriguez",
  position: "Attacker",
  nationality: "Spain",
  value: 7000000,
  team_id: 1313
},
{
  goals: {
      total: 48,
      assists: 51
  },
  cards: {
      yellow: 1,
      red: 0
  },
  _id: "5e1094f089977e00b0bd04bc",
  player_name: "Sergia",
  firstname: "Ramas",
  lastname: "Rodriguaz",
  position: "Attackar",
  nationality: "Spaan",
  value: 7000000,
  team_id: 1313
}]

  return (
    <div id="app">
      <h1>Football App</h1>
      {/* <div id="transfers">
          <h2>Transfers: </h2>
          <Transfers/>
      </div> */}
      <Players players={players}/>
    </div>
  );
}

export default App;
