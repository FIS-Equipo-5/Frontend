import React from 'react';  
import Team from './Team.js';
import Alert from '../Alert.js';
import NewTeam from './NewTeam.js';
import EditTeam from './EditTeam';
import TeamsApi from './TeamsApi';

class Teams extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errorInfo:null,
            teams:[],
            isEditing: {},
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMGUyMzVjOWRmYzRkMDAwZmRiMDdiOCIsImlhdCI6MTU3ODI0Nzc2OSwiZXhwIjoxNTc4MjUxMzY5fQ.B5pyAf8U-MocdtLUIXf663OXjVQv38prckli5Hr2mgk'
        };
        this.handleEdit=this.handleEdit.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
        this.handleCloseError=this.handleCloseError.bind(this);
        this.addTeam=this.addTeam.bind(this);
    }

    /*Método especial de React --> LLamado cuando el componente se instancia*/
    componentDidMount(){
        TeamsApi.getAllTeams(this.state.token).then(
            (result)=>{
                this.setState({
                    teams: result
                })
            },
            (error)=>{
                this.setState({
                    errorInfo: "Problem with connection to server"
                })
            }
        )
    }

    handleEdit(team){
        this.setState(prevState => ({
            isEditing: {...prevState.isEditing, [team.team_id]: team}
        }));
    }

    handleDelete(team){
        TeamsApi.deleteTeam(team.name, this.state.token).then((resultDelete)=>{
            TeamsApi.getAllTeams(this.state.token).then((resultTeams)=>{
                this.setState({
                    teams: resultTeams
                });
            }, (error)=>{
                console.log("Failed when updating the teams list without the deleted team");
                this.setState({
                    errorInfo: "Failed when removing the team!"
                });
            });
        },(error)=>{
            console.log("Failed when removing the team!");
            this.setState({
                errorInfo: "Failed when removing the team!"
            });
        });
    }

    handleCancel(team_id, team){
        this.setState(prevState=>{
            const isEditing = Object.assign({}, prevState.isEditing);
            delete isEditing[team_id];
            return {
                isEditing: isEditing
            };
        });
    }

    handleChange(team_id, team){
        this.setState(prevState => ({
            isEditing: {...prevState.isEditing, [team_id]: team}
        }));
    }

    handleSave(team_id, name, code, team){
        const isEditing = Object.assign({}, this.state.isEditing);
        delete isEditing[team_id];
        if(team_id === team.team_id && name === team.name && code === team.code){
            TeamsApi.updateTeam(team, this.state.token).then((resultUpdate)=>{
                TeamsApi.getAllTeams(this.state.token).then((resultTeams)=>{
                    this.setState({
                        teams: resultTeams,
                        isEditing: isEditing
                    });
                }, (error)=>{
                    console.log("Error when updating the teams list with the updated team");
                    this.setState({
                        errorInfo: "Failed when updating the team!"
                    })
                });
            },(error)=>{
                console.log("Failed when updating the team!")
                this.setState({
                    errorInfo: "Failed when updating the team!"
                });
            });
        }else{
            this.setState({
                errorInfo: "Cannot edit team's name or code",
            });
        }
    }

    handleCloseError(){
        this.setState({
            errorInfo:null
        });
    }

    addTeam(team){
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
            <div>
                <Alert message={this.state.errorInfo} onClose={this.handleCloseError}/>
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
                    <NewTeam onAddTeam={this.addTeam}/>
                    {this.state.teams.map((team)=>
                        ! this.state.isEditing[team.team_id] ?
                        <Team key={team.team_id} team = {team} onEdit={this.handleEdit} onDelete={this.handleDelete}/>
                        :
                        <EditTeam key={team.team_id} team={this.state.isEditing[team.team_id]} 
                                  onCancel={this.handleCancel.bind(this,team.team_id)}
                                  onChange={this.handleChange.bind(this, team.team_id)}
                                  onSave={this.handleSave.bind(this, team.team_id, team.name, team.code)}/>
                    )}
                </table>
            </div>

        );
    }
}

export default Teams;