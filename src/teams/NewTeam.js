import React from 'react';

class NewTeam extends React.Component{
    constructor(props){
        super(props);
        this.state = 
        {
            name: '',
            code: '' ,
            logo: '',
            country: '',
            founded: '',
            venue_name: '',
            venue_surface: '',
            venue_address: '',
            venue_city: '',
            venue_capacity: '',
            budget: '',
            value: ''
          }
          this.changeTeam=this.changeTeam.bind(this);
          this.addTeam=this.addTeam.bind(this);
    }

    changeTeam(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    addTeam(){
        this.props.onAddTeam(this.state);
        this.setState({
            name: '',
            code: '' ,
            logo: '',
            country: '',
            founded: '',
            venue_name: '',
            venue_surface: '',
            venue_address: '',
            venue_city: '',
            venue_capacity: '',
            budget: '',
            value: ''
        });
    }

    render(){
        return(
            <div>
                <h1 style={{margin:"2%"}}>New Team</h1>
                <form style={{marginTop: "3%"}}>
                    <div class="form-group row">
                        <label for="name" class="col-sm-2 col-form-label">Name:</label>
                        <div class="col-sm-4">
                            <input className="form-control" id="name" name="name" value={this.state.name} onChange={this.changeTeam} ></input>
                        </div>
                        <label for="code" class="col-sm-2 col-form-label">Code:</label>
                        <div class="col-sm-4">
                            <input className="form-control" id="code" name="code" value={this.state.code} onChange={this.changeTeam} ></input>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="logo" class="col-sm-2 col-form-label">Logo:</label>
                        <div class="col-sm-4">
                            <input className="form-control" id="logo" name="logo" value={this.state.logo} onChange={this.changeTeam} ></input>
                        </div>
                        <label for="country" class="col-sm-2 col-form-label">Country:</label>
                        <div class="col-sm-4">
                            <input className="form-control" id="country" name="country" value={this.state.country} onChange={this.changeTeam} ></input>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="founded" class="col-sm-2 col-form-label">Founded:</label>
                        <div class="col-sm-4">
                            <input className="form-control" id="founded" name="founded" value={this.state.founded} type="number" min="1857" minLength="4" maxLength="4"  onChange={this.changeTeam}></input>
                        </div>
                        <label for="stadium" class="col-sm-2 col-form-label">Stadium Name:</label>
                        <div class="col-sm-4">
                        <input className="form-control" id="stadium" name="venue_name" value={this.state.venue_name} onChange={this.changeTeam} ></input>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="surface" class="col-sm-2 col-form-label">Surface:</label>
                        <div class="col-sm-4">
                            <input className="form-control" id="surface" name="venue_surface" value={this.state.venue_surface} onChange={this.changeTeam} ></input>
                        </div>
                        <label for="address" class="col-sm-2 col-form-label">Address:</label>
                        <div class="col-sm-4">
                        <input className="form-control" id="address" name="venue_address" value={this.state.venue_address} onChange={this.changeTeam} ></input>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="city" class="col-sm-2 col-form-label">City:</label>
                        <div class="col-sm-4">
                            <input className="form-control" id="city" name="venue_city" value={this.state.venue_city} onChange={this.changeTeam} ></input>
                        </div>
                        <label for="capacity" class="col-sm-2 col-form-label">Capacity:</label>
                        <div class="col-sm-4">
                            <input className="form-control" id="capacity" name="venue_capacity" value={this.state.venue_capacity} type="number" onChange={this.changeTeam} ></input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="budget" class="col-sm-2 col-form-label">Budget:</label>
                        <div class="col-sm-4">
                            <input className="form-control" id="budget" name="budget" value={this.state.budget} type="number" onChange={this.changeTeam} ></input>
                        </div>
                        <label for="value" class="col-sm-2 col-form-label">Value:</label>
                        <div class="col-sm-4">
                        <input className="form-control" id="value" name="value" value={this.state.value} type="number" onChange={this.changeTeam} ></input>
                        </div>
                    </div>
                </form>
                <div style={{float:"right"}}>
                    <button className="btn btn-danger" onClick={() => this.props.onCloseModal()}>Close</button>
                    <button className="btn btn-primary" onClick={this.addTeam} ><i class="fa fa-plus"></i>   Add Team</button>
                </div>
            </div>
        );
    }
}

export default NewTeam;