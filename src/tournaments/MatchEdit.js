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
        this.formatDate();
    }

    handleChange(event) {
        var matchEdited = { ...this.state.match, [event.target.name]: event.target.value };
        if (event.target.name === 'matchDate') {
            this.formatedDate = event.target.value;
        }

        if (event.target.name === 'visitorTeamUuid') {
            // let team = this.props.teams.filter(team => {
            //     return team.team_id === event.target.value;
            // })

            let team = this.props.teams.find(obj => {
                return obj.b === parseInt(event.target.value);
            })
            matchEdited.visitorTeamName = team.name;
        }

        this.setState({
            match: matchEdited
        });
    }

    formatDate() {
        // yyyy-MM-ddThh:mm
        // 2020-01-1TT12:00
        console.log('format_', this.state.match.matchDate);
        this.date = this.state.match.matchDate;
        this.formatedDate = this.date.substring(0, 19);
    }

    handeCloseError() {
        this.setState({
            errorInfo: null,
        });
    }

    validateMatch(player) {
        var valid = true;
        this.props.onSave(this.state.match)
        // if(player.player_name === ''){
        //     valid = false;
        // }
    
        // if(player.firstname === ''){
        //     valid = false;
        // }
    
        // if(player.lastname === ''){
        //     valid = false;
        // }
    
        // if(player.position === ''){
        //     valid = false;
        // }
    
        // if(player.nationality === ''){
        //     valid = false;
        // }
    
        // if(player.value === ''){
        //     valid = false;
        // }
    
        // if(player.team_id === ''){
        //     valid = false;
        // }
    
        // if(player.total === ''){
        //     valid = false;
        // }
    
        // if(player.assists === ''){
        //     valid = false;
        // }
    
        // if(player.yellow === ''){
        //     valid = false;
        // }
    
        // if(player.red === ''){
        //     valid = false;
        // }
        return valid;
    }

    render() {
        console.log('MatchEdit:' + JSON.stringify(this.props));
        return (
            <div className='container'>
                <Alert message={this.state.errorInfo} onClose={this.handeCloseError} />
                {this.state.infoModal}
                <form>
                    <div className='row mb-3'>
                        <div className='col-2'>
                            Local team:
                </div>
                        <div className='col-8'>
                            <select className="form-control" name="localTeamUuid" value={this.state.match.localTeamUuid} onChange={this.handleChange}>
                                {console.log('team.team_id', this.state.match.localTeamUuid)}

                                {this.props.teams.map(team => (
                                    team.team_id === this.state.match.localTeamUuid ?
                                        <option key={team.team_id} selected value={team.team_id}>{team.name}</option>
                                        :
                                        <option key={team.team_id} value={team.team_id}>{team.name}</option>

                                ))};


                                {/* {this.props.teams.map(team =>
                                    <option key={team.team_id} value={team.team_id}>{team.name}</option>
                                )}; */}
                            </select>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-2'>
                            Visitor team:
                </div>
                        <div className='col-8'>
                            <select className="form-control" name="visitorTeamUuid" value={this.state.match.visitorTeamUuid} onChange={this.handleChange}>
                                {this.props.teams.map(team =>
                                    <option key={team.team_id} value={team.team_id}>{team.name}</option>
                                )};
                    </select>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-2'>
                            Date:
                </div>
                        <div className='col-8'>
                            <input type="datetime-local" className="form-control" name="matchDate" value={this.formatedDate} onChange={this.handleChange}
                                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}" required />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-2'>
                            Venue:
                </div>
                        <div className='col-8'>
                            <input className="form-control" name="venue_city" value={this.state.match.venue_city} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-2'>
                            Tournament:
                </div>
                        <div className='col-8'>
                            <input className="form-control" name="tournamentUuid" value={this.state.match.tournamentUuid} onChange={this.handleChange} />
                        </div>
                    </div>
                </form>
                <div className='row h-100 justify-content-center align-items-center'>
                    <button className="btn btn-sm btn-primary" style={{ width: "10%" }} onClick={() => this.checkMatch()}><i className="fa fa-save" /></button>
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