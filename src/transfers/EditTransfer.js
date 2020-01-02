import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditTransfer(props){
    
    const handleChange = event => {
        props.onChange({...props.transfer, [event.target.name]: event.target.value})
    }
    
    return(
        <tr>
                <td>
                    <select className="form-control" id="origin_team_id" name="origin_team_id" value={props.transfer.origin_team_id} onChange={handleChange} disabled>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </td>
                <td>
                    <select className="form-control" id="destiny_team_id" name="destiny_team_id" value={props.transfer.destiny_team_id} onChange={handleChange} disabled>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </td>
                <td>
                    <select className="form-control" id="player_id" name="player_id" value={props.transfer.player_id} onChange={handleChange} disabled>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </td>
                <td>
                    <DatePicker name="transfer_date" selected={props.transfer.transfer_date} onChange={handleChange} value={props.transfer.transfer_date} dateFormat="yyyy-MM-dd" disabled/>
                </td>
                <td>
                    <input className="form-control" name="contract_years" type="text" pattern="[0-9]*" value={props.transfer.contract_years} onChange={handleChange} maxLength="1" />
                </td>
                <td>
                    <input className="form-control" name="cost" type="text" pattern="[0-9]*" value={props.transfer.cost} onChange={handleChange} maxLength="9" />
                </td>
                <td>
                    <button className="btn btn-success" onClick={()=> props.onSave(props.transfer)}>Save</button>
                    <button className="btn btn-danger" onClick={()=> props.onCancel(props.transfer._id)} >Cancel</button>
                </td>
            </tr>
    );
}

export default EditTransfer;