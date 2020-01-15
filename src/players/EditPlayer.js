import React from 'react';

function EditPlayer(props){

    const handleChange = event => {
        props.onChange({...props.player, [event.target.name]: event.target.value})
    }

    return(
        <div style={{padding: "30px"}}>
            <h1>Edit Player</h1>
            <form>
                <div className="form-group row">
                    <label className="col-sm-1 col-form-label">Name:</label>
                    <div className="col-sm-3">
                        <input className="form-control" name="player_name" value={props.player.player_name} onChange={handleChange}/>
                    </div>
                    <label className="col-sm-1 col-form-label">Firstname:</label>
                    <div className="col-sm-3">
                        <input className="form-control" name="firstname" value={props.player.firstname} onChange={handleChange}/>
                    </div>
                    <label className="col-sm-1 col-form-label">Lastname:</label>
                    <div className="col-sm-3">
                        <input className="form-control" name="lastname" value={props.player.lastname} onChange={handleChange}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-1 col-form-label">Position:</label>
                    <div className="col-sm-3">
                        <input className="form-control" name="position" value={props.player.position} onChange={handleChange}/>
                    </div>
                    <label className="col-sm-1 col-form-label">Nationality:</label>
                    <div className="col-sm-3">
                        <input className="form-control" name="nationality" value={props.player.nationality} onChange={handleChange}/>
                    </div>
                    <label className="col-sm-1 col-form-label">Value:</label>
                    <div className="col-sm-3">
                        <input className="form-control" name="value" type="number" value={props.player.value} onChange={handleChange}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-1 col-form-label">Team:</label>
                    <div className="col-sm-3">
                        <select className="form-control" name="team_id" value={props.player.team_id} onChange={handleChange}>
                            <option key="" value=""></option>
                            {props.teams.map(team =>
                                <option key={team.team_id} value={team.team_id}>{team.name}</option>
                            )};
                        </select>
                    </div>
                    <label className="col-sm-1 col-form-label">Goals:</label>
                    <div className="col-sm-3">
                        <input className="form-control" name="total" type="number" value={props.player.total} onChange={handleChange}/>
                    </div>
                    <label className="col-sm-1 col-form-label">Assisted goals:</label>
                    <div className="col-sm-3">
                        <input className="form-control" name="assists" type="number" value={props.player.assists} onChange={handleChange}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-1 col-form-label">Total yellow cards:</label>
                    <div className="col-sm-3">
                        <input className="form-control" name="yellow" type="number" value={props.player.yellow} onChange={handleChange}/>
                    </div>
                    <label className="col-sm-1 col-form-label">Total red cards:</label>
                    <div className="col-sm-3">
                        <input className="form-control" name="red" type="number" value={props.player.red} onChange={handleChange}/>
                    </div>
                </div>
            </form>
            <div className="row" style={{float:"right"}}>
                <button className="btn btn-success" onClick={() => props.onSave(props.player)}>Save</button>
                <button className="btn btn-danger" onClick={() => props.onCloseModal()}>Close</button>        
            </div>
        </div>
    );
}

export default EditPlayer;