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
            <tr>
                <td><input className="form-control" name="name" value={this.state.name} onChange={this.changeTeam}></input></td>
                <td><input className="form-control" name="code" value={this.state.code} onChange={this.changeTeam}></input></td>
                <td><input className="form-control" name="logo" value={this.state.logo} onChange={this.changeTeam}></input></td>
                <td><input className="form-control" name="country" value={this.state.country} onChange={this.changeTeam}></input></td>
                <td><input className="form-control" name="founded" value={this.state.founded} onChange={this.changeTeam}></input></td>
                <td><input className="form-control" name="venue_name" value={this.state.venue_name} onChange={this.changeTeam}></input></td>
                <td><input className="form-control" name="venue_surface" value={this.state.venue_surface} onChange={this.changeTeam}></input></td>
                <td><input className="form-control" name="venue_address" value={this.state.venue_address} onChange={this.changeTeam}></input></td>
                <td><input className="form-control" name="venue_city" value={this.state.venue_city} onChange={this.changeTeam}></input></td>
                <td><input className="form-control" name="venue_capacity" value={this.state.venue_capacity} onChange={this.changeTeam}></input></td>
                <td><input className="form-control" name="budget" value={this.state.budget} onChange={this.changeTeam}></input></td>
                <td><input className="form-control" name="value" value={this.state.value} onChange={this.changeTeam}></input></td>
                <td><button className="btn btn-primary" onClick={this.addTeam}>Add</button></td>
            </tr>
        );
    }
}

export default NewTeam;