import React from 'react';  
import Team from './Team.js';
import Alert from '../Alert.js';
import NewTeam from './NewTeam.js';
import EditTeam from './EditTeam';
import TeamsApi from './TeamsApi';

import Modal from 'react-awesome-modal';
import InfoTeam from './InfoTeam.js';
import pubsub from 'pubsub-js';

class Teams extends React.Component{
    constructor(props){
        super(props);
        console.log("Token --> " + localStorage.getItem('authToken'));
        this.state = {
            errorInfo:null,
            teams:[],
            token: localStorage.getItem('authToken'),
            visible : false,
            infoModal : ""

        };
        this.handleEdit=this.handleEdit.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
        this.handleCloseError=this.handleCloseError.bind(this);
        this.addTeam=this.addTeam.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    /*Método especial de React --> LLamado cuando el componente se instancia*/
    componentDidMount(){
        TeamsApi.getAllTeams(this.state.token).then(
            (result)=>{
                if(result.status === "error"){
                    this.setState({
                        errorInfo: result.message
                    }); 
                }else{
                    this.setState({
                        teams: result
                     })
                }
            },
            (error)=>{
                console.log("Error: " + error.message);
                this.setState({
                    errorInfo: "Problem with connection to server"
                })
            }
        )
    }

    componentWillMount(){
        //Se suscribe al pubsub 'NewTransfer' para actualizar el estado
        this.pubsub_event = pubsub.subscribe('NewTransfer', function(topic, items){
            if(items){
                TeamsApi.getAllTeams(this.state.token).then(
                    (result)=>{
                        if(result.status === "error"){
                            this.setState({
                                errorInfo: result.message
                            }); 
                        }else{
                            this.setState({
                                teams: result
                             })
                        }
                    },
                    (error)=>{
                            this.setState({
                                errorInfo: "Problem with connection to server"
                        })
                    })
            }
        }.bind(this))
    }

    handleEdit(team){
        this.setState(prevState => ({
            isEditing: {...prevState.isEditing, [team.team_id]: team}
        }));
    }

    handleDelete(team){
        TeamsApi.deleteTeam(team.name, this.state.token).then((resultDelete)=>{
            if(resultDelete.status === 204){
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
            }else{
                this.setState({
                    errorInfo: "Error removing the team"
                });
            }
        },(error)=>{
            console.log("Failed when removing the team!");
            this.setState({
                errorInfo: "Failed when removing the team!"
            });
        });
    }

    handleSave(team_id, name, code, team){
        if(validateTeam(team)){
            if(team_id === team.team_id && name === team.name && code === team.code){
                TeamsApi.updateTeam(team, this.state.token).then((resultUpdate)=>{
                    TeamsApi.getAllTeams(this.state.token).then((resultTeams)=>{
                        this.setState({
                            teams: resultTeams
                        });
                        this.closeModal();
                        return;
                    }, (error)=>{
                        console.log("Error when updating the teams list with the updated team");
                        this.setState({
                            errorInfo: "Failed when updating the team!"
                        });
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
        }else{
            this.setState({
                errorInfo: "You must fill in all the fields!"
            });
        }
        this.closeModal();
    }

    handleCloseError(){
        this.setState({
            errorInfo:null
        });
    }

    addTeam(team){
        if(!validateTeam(team)){
                this.setState({
                    errorInfo: "You must fill in all the fields!"
                });
        }else{
            const teams = this.state.teams;
            if(!teams.find(t => (t.team_id === team.team_id || t.name === team.name || t.code === team.code))){
                try{
                    TeamsApi.getAllTeams(this.state.token).then((result)=>{
                        team.team_id = result.length + 1;
                        team.name = team.name.trim();
                        TeamsApi.addNewTeam(team, this.state.token).then(()=>{
                            TeamsApi.getAllTeams(this.state.token).then((allTeams)=>{
                                this.setState({
                                    teams: allTeams
                                });
                                this.closeModal();
                                return;
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
        this.closeModal();
    }

    openModal(team, show) {
        var info;
        if(show === "info"){
            info = <InfoTeam team={team} onCloseModal={this.closeModal}/>;
        }else if(show === "add"){
            info = <NewTeam  onCloseModal={this.closeModal} onAddTeam={this.addTeam}/>;
        }else{
            info = <EditTeam team={team} onCloseModal={this.closeModal} onSave={this.handleSave.bind(this, team.team_id, team.name, team.code)}/>
        }
        this.setState({
            infoModal: info,
            visible : true
        });
        
    }

    closeModal() {
        this.setState({
            visible : false,
            infoModal: ""
        });
        this.componentDidMount();
    }
   
    render(){
        return(
            <div>
                <Modal 
                    visible={this.state.visible}
                    width="50%"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}>
                    <div>
                        {this.state.infoModal}
                    </div>
                </Modal>
                
                <Alert message={this.state.errorInfo} onClose={this.handleCloseError}/>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Logo</th>
                            <th>Country</th>
                            <th>Founded</th>
                            <th>Stadium</th>
                            <th>Surface</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Capacity</th>
                            <th>Budget</th>
                            <th>Value</th>
                            <th><button className="btn btn-primary" onClick={()=>this.openModal({}, "add")}><i className="fa fa-plus"></i>   Add Team</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.teams.map((team)=>
                            <Team key={team.team_id} team = {team} onEdit={this.handleEdit} onDelete={this.handleDelete} onView={this.openModal}/>
                        )}
                    </tbody>
                </table>
            </div>

        );
    }
}



function validateTeam(team){
    console.log(JSON.stringify(team))
    if(team.name === '' || team.code === '' || team.logo === '' || team.country === '' || team.founded === '' || team.venue_name === '' || team.venue_surface === '' || team.venue_address === '' || team.venue_address === '' || team.venue_city === '' || team.venue_capacity === '' || team.budget === '' || team.value === ''){
        return false;
    }
    return true;
}

export default Teams;