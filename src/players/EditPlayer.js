import React from 'react';

function EditPlayer(props){

    const handleChange = event => {
        props.onChange({...props.player, [event.target.name]: event.target.value})
    }

    return(
        <tr>
                <td><input className="form-control" name="player_name" value={props.player.player_name} onChange={handleChange}/></td>
                <td><input className="form-control" name="firstname" value={props.player.firstname} onChange={handleChange}/></td>
                <td><input className="form-control" name="lastname" value={props.player.lastname} onChange={handleChange}/></td>
                <td><input className="form-control" name="position" value={props.player.position} onChange={handleChange}/></td>
                <td><input className="form-control" name="nationality" value={props.player.nationality} onChange={handleChange}/></td>
                <td><input className="form-control" name="value" value={props.player.value} onChange={handleChange}/></td>
                <td><input className="form-control" name="team_id" value={props.player.team_id} onChange={handleChange}/></td>
                <td><input className="form-control" name="total" value={props.player.total} onChange={handleChange}/></td>
                <td><input className="form-control" name="assists" value={props.player.assists} onChange={handleChange}/></td>
                <td><input className="form-control" name="yellow" value={props.player.yellow} onChange={handleChange}/></td>
                <td><input className="form-control" name="red" value={props.player.red} onChange={handleChange}/></td>
                <td>
                    <button className="btn btn-success" onClick={() => props.onSave(props.player)}>Save</button>
                    <button className="btn btn-danger" onClick={() => props.onCancel(props.player)}>Cancel</button>
                </td>
        </tr>
    );
}

export default EditPlayer;