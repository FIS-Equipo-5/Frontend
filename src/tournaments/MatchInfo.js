import React from 'react';
import ModalComponent from '../common/ModalComponent'

function MatchInfo(props) {


    let stats = props.match.stats;
    if (typeof stats === 'undefined') {
        stats = { localScore: "0", visitorScore: "0" }
    }
    let score = stats.localScore + ' - ' + stats.visitorScore;

    let date = props.match.matchDate;

    let formatDate = date.substring(8, 10) + "/"
        + date.substring(5, 7) + "/"
        + date.substring(0, 4)

    return (

        <div className='row justify-content-center align-items-center'>
            <h6>Local:</h6>{props.match.localTeamName} &nbsp;
            <h6>visitor:</h6>{props.match.visitorTeamName} &nbsp;
            <h6>date:</h6> {formatDate} &nbsp;
            <h6>score:</h6>{score} &nbsp;
            <h6>venue:</h6> {props.match.venue_city} &nbsp;
            <button className="btn btn-sm btn-primary" style={{ width: "10%" }} onClick={() => props.onCloseInfo()}>Edit</button>
            <button className="btn btn-danger btn-sm" style={{ width: "10%" }} onClick={() => props.onCloseInfo()}>Close</button>
            &nbsp;
        </div>
    );
}

export default MatchInfo;