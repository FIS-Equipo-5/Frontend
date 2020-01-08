import React from 'react';

function MatchEdit(props) {

    const handleChange = event => {
        // props.onChange({ ...props.match, [event.target.name]: event.target.value })
    }
    console.log('MatchEdit:' + JSON.stringify(props));
    return (
        <div>

            <select className="form-control" name="localTeam_id" value={props.localTeamUuid} onChange={handleChange}>
                {props.teams.map(team =>
                    <option key={team.team_id} value={team.team_id}>{team.name}</option>
                )};
                    </select>
            <input className="form-control" name="localTeamName" value={props.match.local} onChange={handleChange} />
        </div>

    );

    //     "venue_city":"Barcelona",
    //     "tournamentUuid":"5e14a5aba2a83c40ccbdfd94",
    //     "visitorTeamUuid":"2",
    //     "visitorTeamName":"Madrid",
    //     "localTeamUuid":"1",
    //     "localTeamName":"barcelona",
    //     "matchDate":"2020-01-09T12:00:00.000Z",
}

export default MatchEdit;