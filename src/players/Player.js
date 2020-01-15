import React from 'react';

function Player(props) {

    let team = props.teams.filter(team => team.team_id === props.player.team_id);

    return (
            <tr>
                <td>{props.player.player_name}</td>
                <td>{props.player.firstname}</td>
                <td>{props.player.lastname}</td>
                <td>{team[0] !== undefined ? team[0].name : ""}</td>
                <td>
                    <div className="row"> 
                        <button className="btn btn-primary btn-sm" onClick={() => props.onView(props.player, "edit")} style={{width: "20%"}}><i className="fa fa-pencil"></i></button>
                        <button className="btn btn-danger btn-sm" onClick={() => props.onDelete(props.player)} style={{width: "20%"}}><i className="fa fa-trash"></i></button>
                        <button className="btn btn-primary btn-sm" onClick={() => props.onView(props.player, "info")} style={{width: "20%"}}><i className="fa fa-eye"></i></button>
                    </div>
                </td>
            </tr>
            
    );
}

export default Player;