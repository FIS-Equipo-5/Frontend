import React from 'react';

function EditTransfer(props){
    
    const handleChange = event => {
        props.onChange({...props.transfer, [event.target._id]: event.target.value})
    }
    
    return(
        <tr>
            <td><input className="form-control" name="name" value={this.state.origin_team_id} onChange={handleChange} disabled></input></td>
            <td><input className="form-control" name="name" value={this.state.destiny_team_id} onChange={handleChange} disabled></input></td>
            <td><input className="form-control" name="name" value={this.state.player_id} onChange={handleChange} disabled></input></td>
            <td><input className="form-control" name="name" value={this.state.transfer_date} onChange={handleChange} disabled></input></td>
            <td><input className="form-control" name="name" value={this.state.contract_years} onChange={handleChange}></input></td>
            <td><input className="form-control" name="phone" value={this.state.cost} onChange={handleChange}></input></td>
            <td>
                <button className="btn btn-success" onClick={()=> props.onSave(props.transfer)}>Save</button>
                <button className="btn btn-danger" onClick={()=> props.onCancel(props.transfer._id)} >Cancel</button>
            </td>
        </tr>
    );
}

export default EditTransfer;