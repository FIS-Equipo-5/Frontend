import React from 'react';

class EditTransfer extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            transfer: this.props.transfer
        };
        this.teams = props.teams;
        this.players = props.players;
        this.handleChange=this.handleChange.bind(this);
    }
    
    handleChange (event) {
        var transferEdired = {...this.state.transfer, [event.target.name]: event.target.value};
        this.setState({
            transfer: transferEdired
        });
    }
    
    handleCostChange = event => {
        var string = (event.target.validity.valid) ? event.target.value : this.state.transfer.cost;
        let number = Number(string);
        var transferEdited = {...this.state.transfer, [event.target.name]: number};
        this.setState({
            transfer: transferEdited
        });
    }

    handleContractYearsChange = event => {
        var string = (event.target.validity.valid) ? event.target.value : this.state.transfer.cost;
        let number = Number(string);
        var transferEdited = {...this.state.transfer, [event.target.name]: number};
        this.setState({
            transfer: transferEdited
        });
    }

    render(){
        return(
            <div style={{padding: "30px"}}>
                <h1>Edit transfer:</h1>
                <br></br>
                <form>
                    <div className="form-group row">
                        <label className="col-sm-1 col-form-label">Source team:</label>
                        <div className="col-sm-3">
                            <select className="form-control" id="origin_team_id" name="origin_team_id" value={this.state.transfer.origin_team_id} onChange={this.handleChange} disabled>
                                <option label=" "></option>
                                {this.teams.map(team =>
                                    <option key={team.team_id} value={team.team_id}>{team.name}</option>
                                )};
                            </select>
                        </div>
                        <label className="col-sm-1 col-form-label">Target team:</label>
                        <div className="col-sm-3">
                            <select className="form-control" id="destiny_team_id" name="destiny_team_id" value={this.state.transfer.destiny_team_id} onChange={this.handleChange} disabled>
                                <option label=" "></option>
                                {this.teams.map(team =>
                                    <option key={team.team_id} value={team.team_id}>{team.name}</option>
                                )};
                            </select>
                        </div>
                        <label className="col-sm-1 col-form-label">Player:</label>
                        <div className="col-sm-3">
                            <select className="form-control" id="player_id" name="player_id" value={this.state.transfer.player_id} onChange={this.handleChange} disabled>
                                <option label=" "></option>
                                {this.players.map(player =>
                                    <option key={player._id} value={player._id}>{player.player_name} {player.firstname} {player.lastname}</option>
                                )};
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-1 col-form-label">Transfer date:</label>
                        <div className="col-sm-3">
                            <input type="date" className="form-control" name="transfer_date" value={this.state.transfer.transfer_date} onChange={this.handleChange} disabled/>
                        </div>
                        <label className="col-sm-1 col-form-label">Contract Years</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="contract_years" value={this.state.transfer.contract_years}  onChange={this.handleContractYearsChange} type="text" pattern="[0-9]*" maxLength="1"/>
                        </div>
                        <label className="col-sm-1 col-form-label">Cost:</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="cost" value={this.state.transfer.cost}  onChange={this.handleCostChange} type="text" pattern="[0-9]*" maxLength="9"/>
                        </div>
                    </div>
                </form>
                <div className="row" style={{float:"right"}}>
                    <button className="btn btn-success" onClick={() => this.props.onSave(this.state.transfer)}>Save</button>
                    <button className="btn btn-danger" onClick={() => this.props.onCloseModal()}>Close</button>        
                </div>
            </div>
        );
    }
        
}

export default EditTransfer;