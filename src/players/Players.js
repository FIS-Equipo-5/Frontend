import React from 'react';
import Player from './Player.js';
import Alert from '../Alert.js';
import NewPlayer from './NewPlayer.js';
import EditPlayer from './EditPlayer.js';
import PlayersApi from './PlayersApi.js';
import AuthApi from '../auth/AuthApi.js';

import Modal from 'react-awesome-modal';
import TeamsApi from '../teams/TeamsApi.js';
import InfoPlayer from './InfoPlayer.js';
import pubsub from 'pubsub-js';

class Players extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            errorInfo: null,
            success : null,
            players: [],
            token: localStorage.getItem('authToken'),
            visible : false,
            infoModal : "",
            teams: []
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handeCloseError = this.handeCloseError.bind(this);
        this.addPlayer = this.addPlayer.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        PlayersApi.getAllPlayers(this.state.token).then((result) => {
            const players = result;
            if(result.status === "error"){
                if(result.message === "jwt expired"){
                    AuthApi.logout();
                } else {
                    this.setState({
                        errorInfo: result.message
                    }); 
                }
            }else{
                TeamsApi.getAllTeams(this.state.token).then((result) => {
                    if(result.status === "error"){
                        if(result.message === "jwt expired"){
                            AuthApi.logout();
                        } else {
                            this.setState({
                                errorInfo: result.message
                            }); 
                        }
                    }else{
                        this.setState({
                            players: players,
                            teams: result
                        });
                    }
                });
            }
        }, 
        (error) => {
            this.setState({
                errorInfo: "Problem with connection to server"
            });
        })
    }

    componentWillMount(){
        //Se suscribe al pubsub 'NewTransfer' para actualizar el estado
        this.pubsub_event = pubsub.subscribe('NewTransfer', function(topic, items){
            if(items){
                PlayersApi.getAllPlayers(this.state.token).then((result) => {
                    const players = result;
                    if(result.status === "error"){
                        if(result.message === "jwt expired"){
                            AuthApi.logout();
                        } else {
                            this.setState({
                                errorInfo: result.message
                            }); 
                        }
                    }else{
                        this.setState({players: players});
                    }
                }, 
                (error) => {
                    this.setState({
                        errorInfo: "Problem with connection to server"
                    });
                })
            }
        }.bind(this))

        //Se suscribe al pubsub 'NewTeam' para actualizar el estado
        this.pubsub_event = pubsub.subscribe('NewTeam', function(topic, items){
            if(items){
                TeamsApi.getAllTeams(this.state.token).then((result) => {
                    if(result.status === "error"){
                        if(result.message === "jwt expired"){
                            AuthApi.logout();
                        } else {
                            this.setState({
                                errorInfo: result.message
                            }); 
                        }
                    }else{
                        this.setState({teams: result});
                    }
                }, 
                (error) => {
                    this.setState({
                        errorInfo: "Problem with connection to server"
                    });
                })
            }
        }.bind(this))
    }

    componentWillUnmount(){
        pubsub.unsubscribe(this.pubsub_event);
    }

    handleDelete(player) {
        PlayersApi.deletePlayer(player._id, this.state.token).then((result) => {
            PlayersApi.getAllPlayers(this.state.token).then((result) => {
                this.setState({
                    players: result,
                    success: true,
                    errorInfo: "Delete success"
                });
            }, 
            (error) => {
                this.setState({
                    errorInfo: "Problem with connection to server"
                });
            })
        }, 
        (error) => {
            this.setState({
                errorInfo: "Cannot delete the player, try again"
            });
        })
        this.setState(prevState => ({
            players: prevState.players.filter((p) => p._id !== player._id)
        }));
    }

    handleChange(_id, player) {
        this.setState(prevState => ({
            isEditing: {...prevState.isEditing, [_id]: player}
        }));
    }

    handleSave(player) {
        if(validatePlayer(player)){
            PlayersApi.putPlayer(player, this.state.token).then((result) => {
                PlayersApi.getAllPlayers(this.state.token).then((result) => {
                    this.setState({
                        players: result,
                        visible: false,
                        infoModal: "",
                        success: true,
                        errorInfo: "Update success"
                    });
                }, 
                (error) => {
                    this.setState({
                        errorInfo: "Problem with connection to server"
                    });
                })
            }, 
            (error) => {
                this.setState({
                    errorInfo: "Cannot modify the player, try again"
                });
            })
        } else {
            return{
                errorInfo: "Some values are empty"
            }
        }
    }

    handeCloseError() {
        this.setState({
            errorInfo: null,
            success: null
        });
    }

    addPlayer(player){
        this.setState(prevState => {
            if(validatePlayer(player)){
                PlayersApi.postPlayer(player, this.state.token).then((result) => {
                    PlayersApi.getAllPlayers(this.state.token).then((result) => {
                        this.setState({
                            players: result,
                            success: true,
                            visible: false,
                            infoModal: "",
                            errorInfo: "Player added"
                        });
                        //Publica el cambio para el componente de Transfer
                        pubsub.publish('NewPlayer', true);
                    }, 
                    (error) => {
                        this.setState({
                            errorInfo: "Problem with connection to server"
                        });
                    })
                }, 
                (error) => {
                    this.setState({
                        errorInfo: "Cannot create the new player"
                    });
                })
            } else {
                return({
                    errorInfo: 'Some info is empty'
                });
            }
            
        });
    }

    openModal(player, show) {
        TeamsApi.getAllTeams(this.state.token).then((result) => {
            let teams = result;
            let info;
            if(show === "info"){
                PlayersApi.getPlayerAllData(player._id, this.state.token).then((result) => {
                    let playerData = result;
                    info = <InfoPlayer player={playerData} teams={teams} onCloseModal={this.closeModal}/>;
                    this.setState({
                        infoModal: info,
                        visible : true
                    });
                }, 
                (error) => {
                    this.setState({
                        errorInfo: "Problem with connection to server"
                    });
                })
            }else if(show === "edit"){
                player = {...player, 
                    total: player.goals.total,
                    assists: player.goals.assists,
                    yellow: player.cards.yellow,
                    red: player.cards.red
                }
        
                info = <EditPlayer key={player._id} 
                    player={player} 
                    teams={teams} 
                    onCloseModal={this.closeModal}
                    onChange={this.handleChange.bind(this, player._id)} 
                    onSave={this.handleSave.bind(this, player)}/>;
                    this.setState({
                        infoModal: info,
                        visible : true
                    });
            }else if("create"){
                info = <NewPlayer onAddPlayer={this.addPlayer} teams={teams} onCloseModal={this.closeModal}/>
                this.setState({
                    infoModal: info,
                    visible : true
                });
            }
        }, 
        (error) => {
            this.setState({
                errorInfo: "Problem with connection to server"
            });
        });
    }

    closeModal() {
        this.setState({
            visible : false,
            infoModal: ""
        });
    }

    render() {
        return(
            <div>
                <Modal 
                    visible={this.state.visible}
                    width="90%"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                >
                    <div>
                        <Alert message={this.state.errorInfo} onClose={this.handeCloseError}/>
                        {this.state.infoModal}
                    </div>
                </Modal>
                <Alert message={this.state.errorInfo} success={this.state.success} onClose={this.handeCloseError}/>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Team</th>
                            <th><button className="btn btn-success" onClick={() => this.openModal("", "create")}>Add Player</button></th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.players.map((player) =>
                        <Player key={player._id} 
                            player={player} 
                            teams={this.state.teams}
                            onDelete={this.handleDelete} 
                            onView={this.openModal}/>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}

function validatePlayer(player) {
    var valid = true;

    if(player.player_name === ''){
        valid = false;
    }

    if(player.firstname === ''){
        valid = false;
    }

    if(player.lastname === ''){
        valid = false;
    }

    if(player.position === ''){
        valid = false;
    }

    if(player.nationality === ''){
        valid = false;
    }

    if(player.value === ''){
        valid = false;
    }

    if(player.team_id === ''){
        valid = false;
    }

    if(player.total === ''){
        valid = false;
    }

    if(player.assists === ''){
        valid = false;
    }

    if(player.yellow === ''){
        valid = false;
    }

    if(player.red === ''){
        valid = false;
    }
    return valid;
}

export default Players;