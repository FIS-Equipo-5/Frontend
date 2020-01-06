import React from 'react';
import NewTeam from './NewTeam.js';
import Teams from './Teams.js';
import TeamsApi from './TeamsApi';

class MSTeams extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errorInfo: null,
            teams: [],
            token: localStorage.getItem('authToken')
        };
        this.addTeam=this.addTeam.bind(this);
    }

    addTeam(team){
        console.log("entra con " + JSON.stringify(team));
        if(team.name === "" || team.code === "" || team.logo === "" || team.country === "" || team.founded === "" || team.venue_name === "" || team.venue_surface === ""
            || team.venue_address === "" || team.venue_city === "" || team.venue_capacity === "" || team.budget === "" || team.value === ""){
                this.setState({
                    errorInfo: "You must fill in all the fields!"
                });
        }else{
            const teams = this.state.teams;
            if(!teams.find(t => (t.team_id === team.team_id || t.name === team.name || t.code === team.code))){
                try{
                    TeamsApi.getAllTeams(this.state.token).then((result)=>{
                        team.team_id = result.length + 1;
                        TeamsApi.addNewTeam(team, this.state.token).then(()=>{
                            TeamsApi.getAllTeams(this.state.token).then((allTeams)=>{
                                this.setState({
                                    teams: allTeams
                                });
                            });
                        });
                    });
                }catch(err){
                    this.setState({
                        errorInfo: "Failed when inserting the new team!"
                    })
                }

            }else{
                this.setState({
                    errorInfo: "Team already exists!"
                });
            }
        }
    }
   

    render(){
        return(
            <div id="teamsMS" className="row">
                <div id="newTeam" className="col-6">
                    <h2>New Team </h2>
                    <NewTeam onAddTeam={this.addTeam}/>
                </div>
                <div id="teams" className="col-6">
                    <h2>Teams </h2>
                    <Teams teams={this.state.teams}/>
                </div>
            </div>
        );
    }
}


export default MSTeams;