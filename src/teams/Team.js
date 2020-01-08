import React from 'react';

function Team(props){
    return(
        
        <tr>
            <td>{props.team.name}</td>
            <td>{props.team.code}</td>
            <td><img src={props.team.logo} alt="Logo" style={{width:"30px", height:"30px"}}/></td>
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
                <div className="row"> 
                    <button className="btn btn-info btn-sm" onClick={()=>props.onView(props.team, "edit")} style={{width: "20%"}}><i class="fa fa-pencil"></i></button>
                    <button className="btn btn-secondary btn-sm" onClick={()=>props.onView(props.team, "info")} style={{width: "20%"}}><i class="fa fa-eye"></i></button>
                    <button className="btn btn-danger btn-sm" onClick={()=>props.onDelete(props.team)} style={{width: "20%"}}><i class="fa fa-trash"></i></button>
                </div>
            </td>
        </tr>
    );
}

export default Team;
