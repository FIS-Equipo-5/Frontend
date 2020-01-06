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

    let weather = '';
    console.log(props.match.weather);
    if (props.match.weather === 'no weather data') {
        weather = props.match.weather;
    } else {
        weather = props.match.weather[0].weather[0].description;
    }

    return (
        <div className='container'>
            <div className='row justify-content-center align-items-center'>
                <div className='col-2'>
                    <h6>Local</h6><span>{props.match.localTeamName}</span>
                </div>
                <div className='col-2'>
                    <h6>Visitor</h6>{props.match.visitorTeamName}
                </div><div className='col-2'>
                    <h6>Date</h6> {formatDate}
                </div><div className='col-2'>
                    <h6>Score</h6>{score}
                </div>
                <div className='col-2'>
                    <h6>Venue</h6> {props.match.venue_city}
                </div>
                <div className='col-2'>
                    <h6>Weather</h6> {weather}
                </div>
            </div>
            <div className='row justify-content-center align-items-center'>
                <button className="btn btn-sm btn-primary" style={{ width: "10%" }} onClick={() => props.onCloseInfo()}>Edit</button>
                <button className="btn btn-danger btn-sm" style={{ width: "10%" }} onClick={() => props.onCloseInfo()}>Close</button>
            </div>
        </div>
    );
}

export default MatchInfo;