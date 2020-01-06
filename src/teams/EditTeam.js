import React from 'react';  

function EditTeam(props){

    const handleChange = event => {
        props.onChange({...props.team, [event.target.name]: event.target.value});
    }

    return(
        
        <tr>
            <td><input className="form-control" name="name" value={props.team.name} disabled/></td>
            <td><input className="form-control" name="code" value={props.team.code} disabled/></td>
            <td><input className="form-control" name="logo" value={props.team.logo} onChange={handleChange}/></td>
            <td><input className="form-control" name="country" value={props.team.country} onChange={handleChange}/></td>
            <td><input className="form-control" name="founded" value={props.team.founded} onChange={handleChange}/></td>
            <td><input className="form-control" name="venue_name" value={props.team.venue_name} onChange={handleChange}/></td>
            <td><input className="form-control" name="venue_surface" value={props.team.venue_surface} onChange={handleChange}/></td>
            <td><input className="form-control" name="venue_address" value={props.team.venue_address} onChange={handleChange}/></td>
            <td><input className="form-control" name="venue_city" value={props.team.venue_city} onChange={handleChange}/></td>
            <td><input className="form-control" name="venue_capacity" value={props.team.venue_capacity} onChange={handleChange}/></td>
            <td><input className="form-control" name="budget" value={props.team.budget} onChange={handleChange}/></td>
            <td><input className="form-control" name="value" value={props.team.value} onChange={handleChange}/></td>

            <td>
                <div class="row">
                    <button className="btn btn-primary btn-sm" onClick={() => props.onSave(props.team)} style={{width: "30%"}}><i class="fa fa-save"></i></button>
                    <button className="btn btn-danger btn-sm" onClick={() => props.onCancel(props.team)} style={{width: "30%"}}><i class="fa fa-close"></i></button>
                </div>
            </td>
        </tr>

    );
}

export default EditTeam;