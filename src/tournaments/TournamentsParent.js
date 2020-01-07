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
        this.totalPages = 1;
    }

    componentDidMount() {
        // this.getAllMatches(0);
    }

    render() {
        return (
            <div id="tournamentsMS" className="row">
                <div id="tournamens" className="col-6">
                    <h2>Tournaments </h2>
                    <Tournaments selectedTournament={this.state.selectedTournament} />
                </div>
                <div id="matches" className="col-6">
                    <h2>Matches </h2>
                    <Matches selectedTournament={this.state.selectedTournament} />
                </div>
            </div>
        );
    }
}

export default TournamentsParent;