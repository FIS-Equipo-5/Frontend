import React from 'react';

function Transfer(props) {

    let teams = props.teams;
    let players = props.players;

    let originTeam = teams.find( team => 
        team.team_id===props.transfer.origin_team_id
    )

    let destinyTeam = teams.find( team => 
        team.team_id===props.transfer.destiny_team_id
    )

    let playerObj = players.find( player => 
        player._id===props.transfer.player_id
    )

    let formatDate = props.transfer.transfer_date.substring(8,10) + "/" 
        + props.transfer.transfer_date.substring(5,7)+ "/" 
        + props.transfer.transfer_date.substring(0,4)

    if(typeof originTeam==='undefined'){
        originTeam = {name: ""}
    }

    if(typeof destinyTeam==='undefined'){
        destinyTeam = {name: ""}
    }

    if(typeof playerObj==='undefined'){
        playerObj = {player_name: ""}
    }

    return(
        <tr>
            <td>{originTeam.name}</td>
            <td>{destinyTeam.name}</td>
            <td>{playerObj.player_name}</td>
            <td>{formatDate}</td>
            <td>{props.transfer.contract_years}</td>
            <td>{props.transfer.cost}</td>
            <td>
                <button className="btn btn-primary" onClick={() => props.onEdit(props.transfer)}>Edit</button>
                <button className="btn btn-danger" onClick={() => props.onDelete(props.transfer)}>Delete</button></td>
        </tr>
        
    );
}

export default Transfer;