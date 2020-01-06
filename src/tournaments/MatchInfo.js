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

        <div>
            local: {props.match.localTeamName}
            visitor: {props.match.visitorTeamName}
            date: {formatDate}
            score :{score}
            venue: {props.match.venue_city}
            <button className="btn btn-primary" onClick={() => props.onCloseInfo()}>Close</button>

        </div>


        // <td>
        //     <ModalComponent type='danger' buttonMessage='delete' header='Delete Match??'
        //         message='You are about to delete a match, ¿are you sure?' acceptCallback={() => props.onDelete(props.match)} />
        //     <button className="btn btn-primary" onClick={() => props.onEdit(props.match)}>Edit</button>
        // </td>
    );
}

export default MatchInfo;