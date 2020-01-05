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
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMGUyMzVjOWRmYzRkMDAwZmRiMDdiOCIsImlhdCI6MTU3ODIzMzExNSwiZXhwIjoxNTc4MjM2NzE1fQ.4BnBze0jovrxkv9TrKGDKF1bzqpuKs6yH7NYqL1AfKA'
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
        this.setState(prevState=>({
            teams: prevState.teams.filter((t)=>t.team_id !== team.team_id)
        }));
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
        this.setState(prevState => {
            const isEditing = Object.assign({}, prevState.isEditing);
            delete isEditing[team_id];

            if(team_id === team.team_id && name === team.name && code === team.code){
                const teams = prevState.teams;
                const pos = teams.findIndex(t => t.team_id === team_id);
                return {
                    teams: [...teams.slice(0,pos), Object.assign({},team), ...teams.slice(pos+1)],
                    isEditing: isEditing
                }
            }

            return({
                errorInfo: "Cannot edit team_id, name or code",
            });

        });
    }

    handleCloseError(){
        this.setState({
            errorInfo:null
        });
    }

    addTeam(team){
        this.setState(prevState =>{
            const teams = prevState.teams;
            if(!teams.find(t => (t.team_id === team.team_id || t.name === team.name || t.code === team.code))){
                return ({
                    teams: [...prevState.teams, team]
                });
            }else{
                return ({
                    errorInfo: 'Team already exists'
                });
            }
        });
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