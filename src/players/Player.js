import React from 'react';

function Player(props) {

    return (
            <tr>
                <td>{props.player.player_name}</td>
                <td>{props.player.firstname}</td>
                <td>{props.player.lastname}</td>
                <td>{props.player.position}</td>
                <td>{props.player.nationality}</td>
                <td>{props.player.value}</td>
                <td>{props.player.team_id}</td>
                <td>{props.player.goals.total}</td>
                <td>{props.player.goals.assists}</td>
                <td>{props.player.cards.yellow}</td>
                <td>{props.player.cards.red}</td>
                <td>
                    <button className="btn btn-primary" onClick={() => props.onEdit(props.player)} style={{width: "42%", marginBottom: "5px"}}><i class="fa fa-pencil"></i></button>
                    <button className="btn btn-danger" onClick={() => props.onDelete(props.player)} style={{width: "42%", marginBottom: "5px"}}><i class="fa fa-trash"></i></button>
                    <button className="btn btn-primary" onClick={() => props.onView(props.player)} style={{width: "88%", marginTop: "5px"}}><i class="fa fa-eye"></i></button>
                </td>
            </tr>
            
    );
}

export default Player;