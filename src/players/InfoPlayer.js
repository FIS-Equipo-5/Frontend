import React from 'react';  

function InfoPlayer(props){

    return(
        <div style={{padding: "30px"}}>
                <h2>{props.player.player_name}</h2>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Nationality</th>
                            <th>Value</th>
                            <th>Goals</th>
                            <th>Assisted Goals</th>
                            <th>Yellow Cards</th>
                            <th>Red Cards</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{props.player.position}</td>
                            <td>{props.player.nationality}</td>
                            <td>{props.player.value}</td>
                            <td>{props.player.goals.total}</td>
                            <td>{props.player.goals.assists}</td>
                            <td>{props.player.cards.yellow}</td>
                            <td>{props.player.cards.red}</td>
                        </tr>
                    </tbody>
                </table>
   
                <br/>

                <h2>Team</h2>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Country</th>
                            <th>Founded</th>
                            <th>Venue</th>
                            <th>Surface</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Capacity</th>
                            <th>Budget</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.player.team ? 
                            (<tr>
                                <td>{props.player.team.name}</td>
                                <td>{props.player.team.code}</td>
                                <td>{props.player.team.country}</td>
                                <td>{props.player.team.founded}</td>
                                <td>{props.player.team.venue_name}</td>
                                <td>{props.player.team.venue_surface}</td>
                                <td>{props.player.team.venue_city}</td>
                                <td>{props.player.team.venue_capacity}</td>
                                <td>{props.player.team.budget}</td>
                                <td>{props.player.team.value}</td>
                                <td>{props.player.team.team_id}</td>
                            </tr>)
                        : ""}
                    </tbody>
                </table>
   
                <br/>

                <h2>Transfers</h2>
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
                    {
                    (props.player.transfer !== undefined) ?
                    (props.player.transfer.map(transferObject => {
                        let origin = props.teams.filter(team => transferObject.origin_team_id === team.team_id);
                        var destiny = props.teams.filter(team => transferObject.destiny_team_id === team.team_id);
                        if(origin[0] !== undefined && destiny[0] !== undefined) {
                            return(<tr>
                                    <td>{origin[0].name}</td>
                                    <td>{destiny[0].name}</td>
                                    <td>{props.player.player_name}</td>
                                    <td>{transferObject.transfer_date}</td>
                                    <td>{transferObject.contract_years}</td>
                                    <td>{transferObject.cost}</td>
                                </tr>)
                        } else {
                            return (<td colsSpan="6">Los equipos se han eliminado, no se pueden mostrar datos</td>)
                        }
                     })) : ""
                    }
                    </tbody>
                </table>
                <div className="row" style={{float:"right"}}>
                    <button className="btn btn-danger" onClick={() => props.onCloseModal()}>Close</button>        
                </div>
            </div>
    );
}

export default InfoPlayer;