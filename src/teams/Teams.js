import React from 'react';  
import Team from './Team.js';
import Alert from '../Alert.js';

class Teams extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedTeam:null,
            teams:this.props.teams
        };
        this.handleEdit=this.handleEdit.bind(this);
        this.handleCloseError=this.handleCloseError.bind(this);
    }

    handleEdit(team){
        this.setState({
            selectedTeam: team.name
        });
    }

    handleCloseError(){
        this.setState({
            selectedTeam:null
        });
    }

    render(){
        return(
            <div>
                <Alert message={this.state.selectedTeam} onClose={this.handleCloseError}/>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Logo</th>
                            <th>Country</th>
                            <th>Founded</th>
                            <th>Venue</th>
                            <th>Surface</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Capacity</th>
                            <th>Budget</th>
                            <th>Value</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    {this.state.teams.map((team)=>
                        <Team team = {team} onEdit={this.handleEdit}/>
                    )}
                </table>
            </div>

        );
    }
}

export default Teams;