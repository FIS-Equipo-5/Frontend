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
        originTeam = {name: "team was deleted"}
    }

    if(typeof destinyTeam==='undefined'){
        destinyTeam = {name: "team was deleted"}
    }

    if(typeof playerObj==='undefined'){
        playerObj = {player_name: "player was deleted", firstname:"", lastname:""}
    }

    return(
        <tr>
            <td>{originTeam.name}</td>
            <td>{destinyTeam.name}</td>
            <td>{playerObj.player_name} {playerObj.firstname} {playerObj.lastname}</td>
            <td>{formatDate}</td>
            <td>{props.transfer.contract_years}</td>
            <td>{props.transfer.cost}</td>
            <td>
                <div className="row"> 
                    <button className="btn btn-primary btn-sm" onClick={() => props.onView(props.transfer, "edit")} style={{width: "20%"}}><i className="fa fa-pencil"></i></button>
                    <button className="btn btn-danger btn-sm" onClick={() => props.onDelete(props.transfer)} style={{width: "20%"}}><i className="fa fa-trash"></i></button>
                    <button className="btn btn-primary btn-sm" onClick={() => props.onView(props.transfer, "info")} style={{width: "20%"}}><i className="fa fa-eye"></i></button>
                </div>
            </td>
        </tr>
        
    );
}

export default Transfer;