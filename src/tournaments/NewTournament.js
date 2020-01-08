import React from 'react';

class NewTournament extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: '', 
            startDate: '', 
            endDate: '', 
        };
        // this.token = props.token
        // this.teams = []
        // this.players = []
        this.changeTournament = this.changeTournament.bind(this);
        this.clickAdd = this.clickAdd.bind(this);
        // this.handleContractYearsChange = this.handleContractYearsChange.bind(this)
        // this.handleCostChange = this.handleCostChange.bind(this)
    }

    
    // componentDidMount(){
    //     TeamsApi.getAllTeams(this.token)
    //         .then( 
    //             (result) => {
    //                 if(result.status==="error"){
    //                     this.teams = []
    //                 }else{
    //                     this.teams = result
    //                 }
    //             }
    //             ,(error) => {
    //                 this.teams = []
    //             }
    //         );

    //         PlayersApi.getAllPlayers(this.token)
    //         .then( 
    //             (result) => {
    //                 if(result.status==="error"){
    //                     this.players = []
    //                 }else{
    //                     this.players = result
    //                 }
    //             }
    //             ,(error) => {
    //                 this.players = []
    //             }
    //         );
    // }

    changeTournament(event){
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
        this.props.onAddTournament(this.state);
        this.setState({
            name: '', 
            startDate: '', 
            endDate: '', 
        })
    }

    render(){
        return(
            <tr>
                <td style={{width: "20%"}}>
                     <input className="form-control" name="name"  type="text"  value={this.state.name} onChange={this.changeTournament} />
                 </td>
                <td style={{width: "5%"}}>
                    <input type="date" className="form-control"  name="startDate" value={this.state.startDate} onChange={this.changeTournament}/>
                </td>
                <td style={{width: "5%"}}>
                    <input type="date" className="form-control"  name="endDate" value={this.state.endDate} onChange={this.changeTournament}/>
                </td>

                <td>
                     <button className="btn btn-sm btn-info" onClick={this.clickAdd}>Add Tournament</button>
                </td>
            </tr>
            // <tr>
            //     <td>
            //         <select className="form-control" id="origin_team_id" name="origin_team_id" value={this.state.origin_team_id} onChange={this.changeTransfer}>
            //             <option label=" "></option>
            //             {this.teams.map(team =>
            //                 <option key={team.team_id} value={team.team_id}>{team.name}</option>
            //             )};
            //         </select>
            //     </td>
            //     <td>
            //         <select className="form-control" id="destiny_team_id" name="destiny_team_id" value={this.state.destiny_team_id} onChange={this.changeTransfer}>
            //             <option label=" "></option>
            //             {this.teams.map(team =>
            //                 <option key={team.team_id} value={team.team_id}>{team.name}</option>
            //             )};
            //         </select>
            //     </td>
            //     <td>
            //         <select className="form-control" id="player_id" name="player_id" value={this.state.player_id} onChange={this.changeTransfer}>
            //             <option label=" "></option>
            //             {this.players.map(player =>
            //                 <option key={player._id} value={player._id}>{player.player_name}</option>
            //             )};
            //         </select>
            //     </td>
            //     <td>
            //         <input type="date" className="form-control" name="transfer_date" value={this.state.transfer_date} onChange={this.changeTransfer}/>
            //     </td>
            //     <td>
            //         <input className="form-control" name="contract_years" type="text" pattern="[0-9]*" value={this.state.contract_years} onChange={this.handleContractYearsChange} maxLength="1" />
            //     </td>
            //     <td>
            //         <input className="form-control" name="cost" type="text" pattern="[0-9]*" value={this.state.cost} onChange={this.handleCostChange} maxLength="9" />
            //     </td>
            //     <td>
            //         <button className="btn btn-warning" onClick={this.clickAdd}>Add Transfer</button>
            //     </td>
            // </tr>
        );
    }
}

export default NewTournament;