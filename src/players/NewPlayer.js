import React from 'react';

class NewPlayer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            player_name: '', 
            firstname: '', 
            lastname: '', 
            position: '', 
            nationality: '', 
            value: '', 
            team_id: '', 
            total: '', 
            assists: '', 
            yellow: '', 
            red: '',
            token: localStorage.getItem('authToken')
        };
        this.changePlayer = this.changePlayer.bind(this);
        this.clickAdd = this.clickAdd.bind(this);
        this.teams = props.teams;
    }

    changePlayer(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    clickAdd() {
        this.props.onAddPlayer(this.state);
        this.setState({
            player_name: '', firstname: '', lastname: '', position: '', nationality: '', value: '', team_id: '', total: '', assists: '', yellow: '', red: ''
        });
    }

    render() {
        return(
            <div style={{padding: "30px"}}>
                <h1>New Player</h1>
                <form>
                    <div className="form-group row">
                        <label className="col-sm-1 col-form-label">Name:</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="player_name" value={this.state.player_name} onChange={this.changePlayer}/>
                        </div>
                        <label className="col-sm-1 col-form-label">Firstname:</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="firstname" value={this.state.firstname} onChange={this.changePlayer}/>
                        </div>
                        <label className="col-sm-1 col-form-label">Lastname:</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="lastname" value={this.state.lastname} onChange={this.changePlayer}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-1 col-form-label">Position:</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="position" value={this.state.position} onChange={this.changePlayer}/>
                        </div>
                        <label className="col-sm-1 col-form-label">Nationality:</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="nationality" value={this.state.nationality} onChange={this.changePlayer}/>
                        </div>
                        <label className="col-sm-1 col-form-label">Value:</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="value" type="number" value={this.state.value} onChange={this.changePlayer}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-1 col-form-label">Team:</label>
                        <div className="col-sm-3">
                            <select className="form-control" name="team_id" value={this.state.team_id} onChange={this.changePlayer}>
                                <option key="" value=""></option>
                                {this.teams.map(team =>
                                    <option key={team.team_id} value={team.team_id}>{team.name}</option>
                                )};
                            </select>
                        </div>
                        <label className="col-sm-1 col-form-label">Goals:</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="total" type="number" value={this.state.total} onChange={this.changePlayer}/>
                        </div>
                        <label className="col-sm-1 col-form-label">Assisted goals:</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="assists" type="number" value={this.state.assists} onChange={this.changePlayer}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-1 col-form-label">Total yellow cards:</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="yellow" type="number" value={this.state.yellow} onChange={this.changePlayer}/>
                        </div>
                        <label className="col-sm-1 col-form-label">Total red cards:</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="red" type="number" value={this.state.red} onChange={this.changePlayer}/>
                        </div>
                    </div>
                </form>
                <div className="row" style={{float:"right"}}>
                    <button className="btn btn-success" onClick={this.clickAdd}>Save</button>
                    <button className="btn btn-danger" onClick={() => this.props.onCloseModal()}>Close</button>        
                </div>
            </div>
        );
    }
}

export default NewPlayer;