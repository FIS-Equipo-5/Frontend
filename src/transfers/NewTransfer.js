import React from 'react';

class NewTransfer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            _id:'', 
            origin_team_id: '', 
            destiny_team_id: '', 
            transfer_date: '', 
            contract_years: '', 
            cost: '', 
            player_id: '',
            loaded: false
        };
        this.token = localStorage.getItem('authToken') != null ? localStorage.getItem('authToken') : ''
        this.teams = props.teams
        this.players = props.players

        this.clickAdd = this.clickAdd.bind(this);
        this.changeTransfer = this.changeTransfer.bind(this);
        this.handleContractYearsChange = this.handleContractYearsChange.bind(this)
        this.handleCostChange = this.handleCostChange.bind(this)
    }

    changeTransfer(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name] : value
        });
    }

    handleContractYearsChange(event) {
        const number = (event.target.validity.valid) ? event.target.value : this.state.contract_years;
        this.setState({ contract_years: number });
    }

    handleCostChange(event) {
        const number = (event.target.validity.valid) ? event.target.value : this.state.cost;
        this.setState({ cost: number });
    }

    clickAdd(){
        this.props.onAddTransfer(this.state);
        this.setState({
            _id:'', origin_team_id: '', destiny_team_id: '', transfer_date: '', contract_years: '', cost: '', player_id: ''
        })
    }

    render (){
        return(
            <div style={{padding: "30px"}}>
                <h1>New transfer:</h1>
                <br></br>
                <form>
                    <div className="form-group row">
                        <label className="col-sm-1 col-form-label">Source team:</label>
                        <div className="col-sm-3">
                            <select className="form-control" id="origin_team_id" name="origin_team_id" value={this.state.origin_team_id} onChange={this.changeTransfer}>
                                <option label=" "></option>
                                {this.teams.map(team =>
                                    <option key={team.team_id} value={team.team_id}>{team.name}</option>
                                )};
                            </select>
                        </div>
                        <label className="col-sm-1 col-form-label">Target team:</label>
                        <div className="col-sm-3">
                            <select className="form-control" id="destiny_team_id" name="destiny_team_id" value={this.state.destiny_team_id} onChange={this.changeTransfer}>
                                <option label=" "></option>
                                {this.teams.map(team =>
                                    <option key={team.team_id} value={team.team_id}>{team.name}</option>
                                )};
                            </select>
                        </div>
                        <label className="col-sm-1 col-form-label">Player:</label>
                        <div className="col-sm-3">
                            <select className="form-control" id="player_id" name="player_id" value={this.state.player_id} onChange={this.changeTransfer}>
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
                            <input type="date" className="form-control" name="transfer_date" value={this.state.transfer_date} onChange={this.changeTransfer}/>
                        </div>
                        <label className="col-sm-1 col-form-label">Contract Years</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="contract_years" value={this.state.contract_years} onChange={this.handleContractYearsChange} type="text" pattern="[0-9]*" maxLength="1"/>
                        </div>
                        <label className="col-sm-1 col-form-label">Cost:</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="cost" value={this.state.cost} onChange={this.handleCostChange} type="text" pattern="[0-9]*" maxLength="9"/>
                        </div>
                    </div>
                </form>
                <div className="row" style={{float:"right"}}>
                    <button className="btn btn-success" onClick={this.clickAdd}>Save</button>
                    <button className="btn btn-danger" onClick={() => this.props.onCloseModal()}>Close</button>              
                </div>
            </div>
        )
    }

}

export default NewTransfer;