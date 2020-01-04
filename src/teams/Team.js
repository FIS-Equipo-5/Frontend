import React from 'react';

function Team(props){
    return(
        <tr>
            <td>{props.team.name}</td>
            <td>{props.team.code}</td>
            <td><a href={props.team.logo}>{props.team.logo}</a></td>
            <td>{props.team.country}</td>
            <td>{props.team.founded}</td>
            <td>{props.team.venue_name}</td>
            <td>{props.team.venue_surface}</td>
            <td>{props.team.venue_address}</td>
            <td>{props.team.venue_city}</td>
            <td>{props.team.venue_capacity}</td>
            <td>{props.team.budget}</td>
            <td>{props.team.value}</td>
            <td><button className="btn btn-primary" onClick={()=>props.onEdit(props.team)}>Edit</button></td>
        </tr>
    );
}

export default Team;