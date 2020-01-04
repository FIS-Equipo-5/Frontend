import React from 'react';

function EditTransfer(props){
 
    const handleCostChange = event => {
        const number = (event.target.validity.valid) ? event.target.value : props.transfer.cost;
        props.onChange({...props.transfer, cost: number})
    }

    const handleContractYearsChange = event => {
        const number = (event.target.validity.valid) ? event.target.value : props.transfer.contract_years;
        props.onChange({...props.transfer, contract_years: number})
    }
    
    return(
        <tr>
            <td><input className="form-control" name="origin_team_id" value={props.transfer.origin_team_id} disabled></input></td>
            <td><input className="form-control" name="destiny_team_id" value={props.transfer.destiny_team_id} disabled></input></td>
            <td><input className="form-control" name="player_id" value={props.transfer.player_id} disabled></input></td>
            <td><input className="form-control" name="transfer_date" type="date" value={props.transfer.transfer_date} disabled/></td>
            <td><input className="form-control" name="contract_years" value={props.transfer.contract_years} onChange={handleContractYearsChange} type="text" pattern="[0-9]*" maxLength="1"></input></td>
            <td><input className="form-control" name="cost" value={props.transfer.cost} onChange={handleCostChange} type="text" pattern="[0-9]*" maxLength="9"></input></td>
            <td>
                <button className="btn btn-success" onClick={()=> props.onSave(props.transfer)}>Save</button>
                <button className="btn btn-danger" onClick={()=> props.onCancel(props.transfer._id)} >Cancel</button>
            </td>
        </tr>
    );
}

export default EditTransfer;