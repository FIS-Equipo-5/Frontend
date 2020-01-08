import React from 'react';
import Alert from '../Alert.js';

import Matches from './Matches'
import Tournaments from './Tournaments'

class TournamentsParent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errorInfo: null,
            selectedTournament: null,
            token: localStorage.getItem("authToken")
        }
        this.handleSelectTournament = this.handleSelectTournament.bind(this);

    }

    componentDidMount() {
        // this.getAllMatches(0);
    }
    handleSelectTournament(tournamentId) {
        this.setState({ selectedTournament: tournamentId });
    }

    render() {
        return (
            <div id="tournamentsMS" className="row">
                <div id="tournamens" className="col-8">
                    <h2>Tournaments </h2>
                    <Tournaments selectedTournamentCB={this.handleSelectTournament} />
                </div>
                <div id="matches" className="col-4">
                    <h2>Matches </h2>
                    {this.state.selectedTournament ?
                        <button className="btn btn-outline-dark" onClick={() => this.handleSelectTournament(null)}>All matches</button>
                        :
                        ''
                    }
                    <Matches selectedTournament={this.state.selectedTournament} />
                </div>
            </div>
        );
    }
}

export default TournamentsParent;