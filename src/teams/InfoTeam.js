import React from 'react';  

function InfoTeam(props){

    return(
        <div>
            <h1 style={{margin:"2%"}}>{props.team.name}</h1>
            <form style={{marginTop: "3%"}}>
                <div className="form-group row">
                    <label for="name" className="col-sm-2 col-form-label">Name:</label>
                    <div className="col-sm-4">
                        <input className="form-control" id="name" name="name" value={props.team.name} disabled></input>
                    </div>
                    <label for="code" className="col-sm-2 col-form-label">Code:</label>
                    <div className="col-sm-4">
                        <input className="form-control" id="code" name="code" value={props.team.code} disabled></input>
                    </div>
                </div>

                <div className="form-group row">
                    <label for="logo" className="col-sm-2 col-form-label">Logo:</label>
                    <div className="col-sm-4">
                        <input className="form-control" id="logo" name="logo" value={props.team.logo} disabled></input>
                    </div>
                    <label for="country" className="col-sm-2 col-form-label">Country:</label>
                    <div className="col-sm-4">
                        <input className="form-control" id="country" name="country" value={props.team.country} disabled></input>
                    </div>
                </div>

                <div className="form-group row">
                    <label for="founded" className="col-sm-2 col-form-label">Founded:</label>
                    <div className="col-sm-4">
                        <input className="form-control" id="founded" name="founded" value={props.team.founded} disabled></input>
                    </div>
                    <label for="stadium" className="col-sm-2 col-form-label">Stadium Name:</label>
                    <div className="col-sm-4">
                    <input className="form-control" id="stadium" name="venue_name" value={props.team.venue_name} disabled></input>
                    </div>
                </div>

                <div className="form-group row">
                    <label for="surface" className="col-sm-2 col-form-label">Surface:</label>
                    <div className="col-sm-4">
                        <input className="form-control" id="surface" name="venue_surface" value={props.team.venue_surface} disabled></input>
                    </div>
                    <label for="address" className="col-sm-2 col-form-label">Address:</label>
                    <div className="col-sm-4">
                    <input className="form-control" id="address" name="venue_address" value={props.team.venue_address} disabled ></input>
                    </div>
                </div>

                <div className="form-group row">
                    <label for="city" className="col-sm-2 col-form-label">City:</label>
                    <div className="col-sm-4">
                        <input className="form-control" id="city" name="venue_city" value={props.team.venue_city} disabled></input>
                    </div>
                    <label for="capacity" className="col-sm-2 col-form-label">Capacity:</label>
                    <div className="col-sm-4">
                        <input className="form-control" id="capacity" name="venue_capacity" value={props.team.venue_capacity} disabled></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label for="budget" className="col-sm-2 col-form-label">Budget:</label>
                    <div className="col-sm-4">
                        <input className="form-control" id="budget" name="budget" value={props.team.budget} disabled></input>
                    </div>
                    <label for="value" className="col-sm-2 col-form-label">Value:</label>
                    <div className="col-sm-4">
                    <input className="form-control" id="value" name="value" value={props.team.value} disabled></input>
                    </div>
                </div>

            </form>  
            <button className="btn btn-danger" onClick={() => props.onCloseModal()} style={{float:"right", marginRight:"2%"}}>Close</button>
        </div>

    );
}

export default InfoTeam;