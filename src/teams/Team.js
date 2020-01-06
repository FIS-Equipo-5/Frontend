import React from 'react';

function Team(props){
    return(
        
        <tr>
            <td>{props.team.name}</td>
            <td>{props.team.code}</td>
            <td><a href={props.team.logo}>{props.team.name}</a></td>
            <td>{props.team.country}</td>
            <td>{props.team.founded}</td>
            <td>{props.team.venue_name}</td>
            <td>{props.team.venue_surface}</td>
            <td>{props.team.venue_address}</td>
            <td>{props.team.venue_city}</td>
            <td>{props.team.venue_capacity}</td>
            <td>{props.team.budget}</td>
            <td>{props.team.value}</td>

            <td>
                <div class="row">
                    <button className="btn btn-info btn-sm" onClick={()=>props.onEdit(props.team)} style={{width: "30%"}}><i class="fa fa-pencil"></i></button>
                    <button className="btn btn-danger btn-sm" onClick={()=>props.onDelete(props.team)} style={{width: "30%"}}><i class="fa fa-trash"></i></button>
                </div>
            </td>
        </tr>
    );
}

export default Team;