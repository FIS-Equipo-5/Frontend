import React from 'react';

function MatchEdit(props) {

    const handleChange = event => {
        // props.onChange({ ...props.match, [event.target.name]: event.target.value })
    }
    console.log('MatchEdit:' + JSON.stringify(props));
    return (
        <div className='container'>
            <div className='row mb-3'>
                <div className='col-2'>
                    Local team:
                </div>
                <div className='col-8'>
                    <select className="form-control" name="localTeam_id" value={props.localTeamUuid} onChange={handleChange}>
                        {props.teams.map(team =>
                            <option key={team.team_id} value={team.team_id}>{team.name}</option>
                        )};
                    </select>
                </div>
            </div>
            <div className='row mb-3'>
                <div className='col-2'>
                    Visitor team:
                </div>
                <div className='col-8'>
                    <select className="form-control" name="visitorTeam_id" value={props.visitorTeamUuid} onChange={handleChange}>
                        {props.teams.map(team =>
                            <option key={team.team_id} value={team.team_id}>{team.name}</option>
                        )};
                    </select>
                </div>
            </div>
            <div className='row mb-3'>
                <div className='col-2'>
                    Venue:
                </div>
                <div className='col-8'>
                    <input className="form-control" name="venue" value={props.match.venue_city} onChange={handleChange} />

                </div>
            </div>
            <div className='row mb-3'>
                <div className='col-2'>
                    Venue:
                </div>
                <div className='col-8'>
                    <input className="form-control" name="localTeamName" value={props.match.venue_city} onChange={handleChange} />
                </div>
            </div>
            <div className='row mb-3'>
                <div className='col-2'>
                    Tournament:
                </div>
                <div className='col-8'>
                    <input className="form-control" name="tournament_id" value={props.match.tournamentUuid} onChange={handleChange} />
                </div>
            </div>
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