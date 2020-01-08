import React from 'react';

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
    let icon = '';
    console.log(props.match.weather);
    if (props.match.weather === 'no weather data') {
        weather = props.match.weather;
    } else {
        weather = props.match.weather[0].weather[0].description;
        let iconPic = props.match.weather[0].weather[0].icon.match(/\d+/);
        console.log(iconPic);
        icon = "http://openweathermap.org/img/wn/" + iconPic + "d@2x.png";
    }

    return (
        <div>
            <table className="table" align='center'>
                <thead>
                    <tr>
                        <th>Local</th>
                        <th>Visitor</th>
                        <th>Date</th>
                        <th>Score</th>
                        <th>Venue</th>
                        <th>Weather</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>{props.match.localTeamName}</td>
                        <td>{props.match.visitorTeamName}</td>
                        <td>{formatDate}</td>
                        <td>{score}</td>
                        <td>{props.match.venue_city}</td>

                        <td>
                            {weather === 'no weather data' ? weather :
                                <div>{weather} <img style={{ width: "20%" }} src={icon} alt='icon' /> </div>}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className='row justify-content-center align-items-center'>
                <button className="btn btn-sm btn-primary" style={{ width: "10%" }} onClick={() => props.onCloseInfo()}>Edit</button>
                <button className="btn btn-danger btn-sm" style={{ width: "10%" }} onClick={() => props.onCloseInfo()}>Close</button>
            </div>
        </div>
    );
}

export default MatchInfo;