import React from 'react';

function EditTransfer(props){

    let teams = props.teams;
    let players = props.players;

    const handleChange = event => {
        props.onChange({...props.contact, [event.target.name]: event.target.value})
    }
 
    const handleCostChange = event => {
        const number = (event.target.validity.valid) ? event.target.value : props.transfer.cost;
        props.onChange({...props.transfer, cost: number})
    }

    const handleContractYearsChange = event => {
        const number = (event.target.validity.valid) ? event.target.value : props.transfer.contract_years;
        props.onChange({...props.transfer, contract_years: number})
    }
    
    return(
        <tr>
            <td>
                <select className="form-control" id="origin_team_id" name="origin_team_id" value={props.transfer.origin_team_id} onChange={handleChange} disabled>
                    <option label=" "></option>
                    {teams.map(team =>
                        <option key={team.team_id} value={team.team_id}>{team.name}</option>
                    )};
                </select>
            </td>
            <td>
                <select className="form-control" id="destiny_team_id" name="destiny_team_id" value={props.transfer.destiny_team_id} onChange={handleChange} disabled>
                    <option label=" "></option>
                    {teams.map(team =>
                        <option key={team.team_id} value={team.team_id}>{team.name}</option>
                    )};
                </select>
            </td>
            <td>
                <select className="form-control" id="player_id" name="player_id" value={props.transfer.player_id} onChange={handleChange} disabled>
                    <option label=" "></option>
                    {players.map(player =>
                        <option key={player._id} value={player._id}>{player.player_name}</option>
                    )};
                </select>
            </td>
            <td>
                <input type="date" className="form-control" name="transfer_date" value={props.transfer.transfer_date} onChange={handleChange} disabled/>
            </td>
            <td>
                <input className="form-control" name="contract_years" value={props.transfer.contract_years} onChange={handleContractYearsChange} type="text" pattern="[0-9]*" maxLength="1"></input></td>
            <td>
                <input className="form-control" name="cost" value={props.transfer.cost} onChange={handleCostChange} type="text" pattern="[0-9]*" maxLength="9"></input>
            </td>  
            <td>
                <button className="btn btn-success" onClick={()=> props.onSave(props.transfer)}>Save</button>
                <button className="btn btn-danger" onClick={()=> props.onCancel(props.transfer._id)} >Cancel</button>
            </td>
        </tr>
    );
}

export default EditTransfer;