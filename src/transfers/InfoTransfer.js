import React from 'react';  

function InfoTransfer(props){

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
        <div style={{padding: "30px"}}>
            <h1>Transfer Info: </h1>
            <br></br>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Source Team</th>
                            <th>Target Team</th>
                            <th>Player</th>
                            <th>Transfer Date</th>
                            <th>Contract Years</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{originTeam.name}</td>
                            <td>{destinyTeam.name}</td>
                            <td>{playerObj.player_name} {playerObj.firstname} {playerObj.lastname}</td>
                            <td>{formatDate}</td>
                            <td>{props.transfer.contract_years}</td>
                            <td>{props.transfer.cost}</td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <div className="row" style={{float:"right"}}>
                    <button className="btn btn-danger" onClick={() => props.onCloseModal()}>Close</button>        
                </div>
            </div>
    );
}

export default InfoTransfer;