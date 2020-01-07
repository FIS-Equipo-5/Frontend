import React from 'react';

function Match(props) {


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
        <tr>
            <td>{props.match.localTeamName}</td>
            <td>{props.match.visitorTeamName}</td>
            <td>{formatDate}</td>
            <td>{score}</td>

            <td>
                <button className="btn btn-primary" onClick={() => props.onOpenInfo(props.match)}>Info</button>
                <button className="btn btn-danger" onClick={() => props.onDelete(props.match)}>Delete</button>
                {/* <ModalComponent type='danger' buttonMessage='delete' header='Delete Match??'
                    message='You are about to delete a match, ¿are you sure?' acceptCallback={() => props.onDelete(props.match)} /> */}
            </td>
        </tr>
    );
}

export default Match;