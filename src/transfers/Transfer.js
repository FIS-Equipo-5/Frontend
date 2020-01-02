import React from 'react';

function Transfer(props) {
    return(
        <tr>
            <td>{props.transfer.origin_team_id}</td>
            <td>{props.transfer.destiny_team_id}</td>
            <td>{props.transfer.player_id}</td>
            <td>{props.transfer.transfer_date}</td>
            <td>{props.transfer.contract_years}</td>
            <td>{props.transfer.cost}</td>
            <td>
                <button className="btn btn-primary" onClick={() => props.onEdit(props.transfer)}>Edit</button>
                <button className="btn btn-danger" onClick={() => props.onDelete(props.transfer)}>Delete</button></td>
        </tr>
        
    );
}

export default Transfer;