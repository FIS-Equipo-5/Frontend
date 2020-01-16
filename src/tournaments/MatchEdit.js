import React from 'react';
import Alert from '../Alert.js';



class MatchEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorInfo: null,
            match: this.props.match
        };
        this.handleChange = this.handleChange.bind(this);
        this.handeCloseError = this.handeCloseError.bind(this);
        this.handleLocalScoreChange = this.handleLocalScoreChange.bind(this);
        this.handleVisitorScoreChange = this.handleVisitorScoreChange.bind(this);
        this.formatDate();
    }

    handleChange(event) {

        let matchEdited = { ...this.state.match, [event.target.name]: event.target.value };
        if (event.target.name === 'matchDate') {
            this.formatedDate = event.target.value;
        }
        this.setState({
            match: matchEdited
        });
    }

    handleLocalScoreChange(event) {

        let matchEdited = this.state.match;
        matchEdited.stats.localScore = event.target.value;
        this.setState({
            match: matchEdited
        });
    }

    handleVisitorScoreChange(event) {

        let matchEdited = this.state.match;
        matchEdited.stats.visitorScore = event.target.value;
        this.setState({
            match: matchEdited
        });
    }


    formatDate() {
        // yyyy-MM-ddThh:mm
        // 2020-01-1TT12:00
        this.date = this.state.match.matchDate;
        this.formatedDate = this.date.substring(0, 19);
    }

    handeCloseError() {
        this.setState({
            errorInfo: null,
        });
    }

    validateMatch() {
        let error = [];

        if (this.state.match.venue_city === '') {
            error.push('Venue city');
        }
        if (this.state.match.tournamentUuid === '') {
            error.push('Tournament');
        }
        if (this.state.match.stats.localScore < 0) {
            error.push('Local score');
        }
        if (this.state.match.stats.visitorScore < 0) {
            error.push('Visitor score');
        }

        if (error === undefined || error.length === 0) {
            this.props.onSave(this.state.match)
        } else {
            this.setState({
                errorInfo: 'Invalid parameters: ' + error.join(),
            });
        }
    }

    render() {
        return (
            <div className='container'>
                <Alert message={this.state.errorInfo} onClose={this.handeCloseError} />
                <form>
                    <div className='row mb-3'>
                        <div className='col-2' style={{ 'fontWeight': 'bold' }}>
                            Local team:
                        </div>
                        <div className='col-7'>
                            <select className="form-control" name="localTeamName" value={this.state.match.localTeamName} onChange={this.handleChange}>

                                {this.props.teams.map(team =>
                                    <option key={team.team_id} value={team.name}>{team.name}</option>
                                )};
                            </select>
                        </div>
                        <div className='col-1' style={{ 'fontWeight': 'bold' }}>
                            Score:
                        </div>
                        <div className='col-2'>
                            <input type="number" className="form-control" name="stats.localScore" value={this.state.match.stats.localScore} onChange={this.handleLocalScoreChange} />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-2' style={{ 'fontWeight': 'bold' }}>
                            Visitor team:
                        </div>
                        <div className='col-7'>
                            <select className="form-control" name="visitorTeamName" value={this.state.match.visitorTeamName} onChange={this.handleChange}>
                                {this.props.teams.map(team =>
                                    <option key={team.team_id} value={team.name}>{team.name}</option>
                                )};
                            </select>
                        </div>
                        <div className='col-1' style={{ 'fontWeight': 'bold' }}>
                            Score:
                        </div>
                        <div className='col-2'>
                            <input type="number" className="form-control" name="stats.visitorScore" value={this.state.match.stats.visitorScore} onChange={this.handleVisitorScoreChange} />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-2' style={{ 'fontWeight': 'bold' }}>
                            Date:
                        </div>
                        <div className='col-10'>
                            <input type="datetime-local" className="form-control" name="matchDate" value={this.formatedDate} onChange={this.handleChange}
                                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}" required />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-2' style={{ 'fontWeight': 'bold' }}>
                            Venue:
                        </div>
                        <div className='col-10'>
                            <input className="form-control" name="venue_city" value={this.state.match.venue_city} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-2' style={{ 'fontWeight': 'bold' }}>
                            Tournament:
                        </div>
                        <div className='col-10'>
                            <input className="form-control" name="tournamentUuid" value={this.state.match.tournamentUuid} onChange={this.handleChange} />
                        </div>
                    </div>
                </form>
                <div className='row h-100 justify-content-center align-items-center'>
                    <button className="btn btn-sm btn-primary" style={{ width: "10%" }} onClick={() => this.validateMatch()}><i className="fa fa-save" /></button>
                    <button className="btn btn-danger btn-sm" style={{ width: "10%" }} onClick={() => this.props.onCancel()}>Close</button>
                </div>
            </div>

        );
    }

    //     "venue_city":"Barcelona",
    //     "tournamentUuid":"5e14a5aba2a83c40ccbdfd94",
    //     "visitorTeamUuid":"2",
    //     "visitorTeamName":"Madrid",
    //     "localTeamUuid":"1",
    //     "localTeamName":"barcelona",
    //     "matchDate":"2020-01-09T12:00:00.000Z",
}

export default MatchEdit;