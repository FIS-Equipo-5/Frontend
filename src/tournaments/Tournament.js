import React from 'react';
// import ModalComponent from '../common/ModalComponent'

function Tournament(props) {

    let startdate = props.tournament.startDate;
    startdate = startdate.substring(8, 10) + "/"
        + startdate.substring(5, 7) + "/"
        + startdate.substring(0, 4)
    let enddate = props.tournament.endDate;
    enddate = enddate.substring(8, 10) + "/"
        + enddate.substring(5, 7) + "/"
        + enddate.substring(0, 4)

    return (
        <tr>
            <td>{props.tournament.name}</td>
            <td>{startdate}</td>
            <td>{enddate}</td>
            <td>
                <button className=" btn btn-sm btn-outline-dark" style={{width: "20%"}} onClick={() => props.onDelete(props.tournament)}>Delete</button>
                <button className=" btn btn-sm btn-outline-dark" style={{width: "10%"}} onClick={() => props.onDelete(props.tournament)}>Init</button>
                <button className=" btn btn-sm btn-outline-dark" style={{width: "20%"}} onClick={() => props.onDelete(props.tournament)}>Update</button>
                <button className=" btn btn-sm btn-outline-dark"  onClick={() => props.onSelect(props.tournament._id)}>View Matches</button>
            </td>
        </tr>
    );
}

export default Tournament;