import React from 'react';

class EditPlayer extends React.Component{
    constructor(props){
        super(props);
        this.state = 
        {
            player: this.props.player,
            teams: this.props.teams
        };
        this.handleChange=this.handleChange.bind(this);
    }

    

    handleChange(event){
        var playerEdited = {...this.state.player, [event.target.name]: event.target.value};
        this.setState({
            player: playerEdited
        });
    }

    render(){
        return(
            <div style={{padding: "30px"}}>
                <h1>Edit Player</h1>
                <form>
                    <div className="form-group row">
                        <label className="col-sm-1 col-form-label">Name:</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="player_name" value={this.state.player.player_name} onChange={this.handleChange}/>
                        </div>
                        <label className="col-sm-1 col-form-label">Firstname:</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="firstname" value={this.state.player.firstname} onChange={this.handleChange}/>
                        </div>
                        <label className="col-sm-1 col-form-label">Lastname:</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="lastname" value={this.state.player.lastname} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-1 col-form-label">Position:</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="position" value={this.state.player.position} onChange={this.handleChange}/>
                        </div>
                        <label className="col-sm-1 col-form-label">Nationality:</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="nationality" value={this.state.player.nationality} onChange={this.handleChange}/>
                        </div>
                        <label className="col-sm-1 col-form-label">Value:</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="value" type="number" value={this.state.player.value} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-1 col-form-label">Team:</label>
                        <div className="col-sm-3">
                            <select className="form-control" name="team_id" value={this.state.player.team_id} onChange={this.handleChange}>
                                <option key="" value=""></option>
                                {this.state.teams.map(team =>
                                    <option key={team.team_id} value={team.team_id}>{team.name}</option>
                                )};
                            </select>
                        </div>
                        <label className="col-sm-1 col-form-label">Goals:</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="total" type="number" value={this.state.player.total} onChange={this.handleChange}/>
                        </div>
                        <label className="col-sm-1 col-form-label">Assisted goals:</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="assists" type="number" value={this.state.player.assists} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-1 col-form-label">Total yellow cards:</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="yellow" type="number" value={this.state.player.yellow} onChange={this.handleChange}/>
                        </div>
                        <label className="col-sm-1 col-form-label">Total red cards:</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="red" type="number" value={this.state.player.red} onChange={this.handleChange}/>
                        </div>
                    </div>
                </form>
                <div className="row" style={{float:"right"}}>
                    <button className="btn btn-success" onClick={() => this.props.onSave(this.state.player)}>Save</button>
                    <button className="btn btn-danger" onClick={() => this.props.onCloseModal()}>Close</button>        
                </div>
            </div>
        );
    }
}

export default EditPlayer;