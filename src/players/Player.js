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
                <td>{props.player.total}</td>
                <td>{props.player.assists}</td>
                <td>{props.player.yellow}</td>
                <td>{props.player.red}</td>
                <td>
                    <button className="btn btn-primary" onClick={() => props.onEdit(props.player)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => props.onDelete(props.player)}>Delete</button>
                </td>
            </tr>
    );
}

export default Player;