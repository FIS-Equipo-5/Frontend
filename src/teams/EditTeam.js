import React from 'react';  

class EditTeam extends React.Component{
    constructor(props){
        super(props);
        this.state = 
        {
            team: this.props.team
        };
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange(event){
        var teamEdited = {...this.state.team, [event.target.name]: event.target.value};
        this.setState({
            team: teamEdited
        });
    }

    render(){
        return(<div>
            <h1 style={{margin:"2%"}}>Edit Team</h1>
            <form style={{marginTop: "3%"}}>
                <div className="form-group row">
                    <label for="name" className="col-sm-2 col-form-label">Name:</label>
                    <div className="col-sm-4">
                        <input className="form-control" id="name" name="name" value={this.state.team.name} disabled></input>
                    </div>
                    <label for="code" className="col-sm-2 col-form-label">Code:</label>
                    <div className="col-sm-4">
                        <input className="form-control" id="code" name="code" value={this.state.team.code} disabled></input>
                    </div>
                </div>

                <div className="form-group row">
                    <label for="logo" className="col-sm-2 col-form-label">Logo:</label>
                    <div className="col-sm-4">
                        <input className="form-control" id="logo" name="logo" value={this.state.team.logo} onChange={this.handleChange}></input>
                    </div>
                    <label for="country" className="col-sm-2 col-form-label">Country:</label>
                    <div className="col-sm-4">
                        <input className="form-control" id="country" name="country" value={this.state.team.country} onChange={this.handleChange}></input>
                    </div>
                </div>

                <div className="form-group row">
                    <label for="founded" className="col-sm-2 col-form-label">Founded:</label>
                    <div className="col-sm-4">
                        <input className="form-control" id="founded" name="founded" value={this.state.team.founded} onChange={this.handleChange}></input>
                    </div>
                    <label for="stadium" className="col-sm-2 col-form-label">Stadium Name:</label>
                    <div className="col-sm-4">
                    <input className="form-control" id="stadium" name="venue_name" value={this.state.team.venue_name} onChange={this.handleChange}></input>
                    </div>
                </div>

                <div className="form-group row">
                    <label for="surface" className="col-sm-2 col-form-label">Surface:</label>
                    <div className="col-sm-4">
                        <input className="form-control" id="surface" name="venue_surface" value={this.state.team.venue_surface} onChange={this.handleChange}></input>
                    </div>
                    <label for="address" className="col-sm-2 col-form-label">Address:</label>
                    <div className="col-sm-4">
                    <input className="form-control" id="address" name="venue_address" value={this.state.team.venue_address} onChange={this.handleChange}></input>
                    </div>
                </div>

                <div className="form-group row">
                    <label for="city" className="col-sm-2 col-form-label">City:</label>
                    <div className="col-sm-4">
                        <input className="form-control" id="city" name="venue_city" value={this.state.team.venue_city} onChange={this.handleChange}></input>
                    </div>
                    <label for="capacity" className="col-sm-2 col-form-label">Capacity:</label>
                    <div className="col-sm-4">
                        <input className="form-control" id="capacity" name="venue_capacity" value={this.state.team.venue_capacity} onChange={this.handleChange}></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label for="budget" className="col-sm-2 col-form-label">Budget:</label>
                    <div className="col-sm-4">
                        <input className="form-control" id="budget" name="budget" value={this.state.team.budget} onChange={this.handleChange}></input>
                    </div>
                    <label for="value" className="col-sm-2 col-form-label">Value:</label>
                    <div className="col-sm-4">
                        <input className="form-control" id="value" name="value" value={this.state.team.value} onChange={this.handleChange}></input>
                    </div>
                </div>

            </form> 
            <div className="row" style={{float:"right"}}>
                <button className="btn btn-danger" onClick={() => this.props.onCloseModal()}>Close</button>
                <button className="btn btn-primary" onClick={() => this.props.onSave(this.state.team)} >Edit Team</button>
            </div>
        </div>);
    }

}



export default EditTeam;