import React from 'react';
import Player from './Player.js';
import Alert from '../Alert.js';
import NewPlayer from './NewPlayer.js';
import EditPlayer from './EditPlayer.js';
import PlayersApi from './PlayersApi.js';
import AuthApi from '../auth/AuthApi.js';

import Modal from 'react-awesome-modal';
import ReactHtmlParser from 'react-html-parser';
import TeamsApi from '../teams/TeamsApi.js';

class Players extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            errorInfo: null,
            players: [],
            isEditing: {},
            token: localStorage.getItem('authToken'),
            visible : false,
            infoModal : "",
            teams: []
        }
        this.handleEdit = this.handleEdit.bind(this);
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

    handleEdit(player) {
        player = {...player, 
            total: player.goals.total,
            assists: player.goals.assists,
            yellow: player.cards.yellow,
            red: player.cards.red
        }

        this.setState(prevState => ({
            isEditing: {...prevState.isEditing, [player._id]: player}
        }));
    }

    handleDelete(player) {
        PlayersApi.deletePlayer(player._id, this.state.token).then((result) => {
            PlayersApi.getAllPlayers(this.state.token).then((result) => {
                this.setState({
                    players: result
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

    handleCancel(_id, player) {
        this.setState(prevState => {
            const isEditing = Object.assign({}, prevState.isEditing);
            delete isEditing[_id];
            return {
                isEditing: isEditing
            }
        });
    }

    handleChange(_id, player) {
        this.setState(prevState => ({
            isEditing: {...prevState.isEditing, [_id]: player}
        }));
    }

    handleSave(_id, player) {
        this.setState(prevState => {
            const isEditing = Object.assign({}, prevState.isEditing);
            delete isEditing[_id];

            if(validatePlayer(player)){
                PlayersApi.putPlayer(player, this.state.token).then((result) => {
                    PlayersApi.getAllPlayers(this.state.token).then((result) => {
                        this.setState({
                            players: result,
                            isEditing: isEditing
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
            
        });
    }

    handeCloseError() {
        this.setState({
            errorInfo: null
        });
    }

    addPlayer(player){
        this.setState(prevState => {
            if(validatePlayer(player)){
                PlayersApi.postPlayer(player, this.state.token).then((result) => {
                    PlayersApi.getAllPlayers(this.state.token).then((result) => {
                        this.setState({
                            players: result
                        });
                    }, 
                    (error) => {
                        this.setState({
                            errorInfo: "Problem with connection to server"
                        });
                    })
                }, 
                (error) => {
                    //SI NO
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

    openModal(player) {
        PlayersApi.getPlayerAllData(player._id, this.state.token).then((result) => {
            const information = objectToHtml(result, this.state.teams);

                    this.setState({
                        infoModal: information,
                        visible : true
                    });
        }, 
        (error) => {
            this.setState({
                errorInfo: "Cannot get information, try again later"
            });
        })
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
                        {this.state.infoModal}
                        <button className="btn btn-primary" onClick={() => this.closeModal()}>Close</button>
                    </div>
                </Modal>
                <Alert message={this.state.errorInfo} onClose={this.handeCloseError}/>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Position</th>
                            <th>Nationality</th>
                            <th>Value</th>
                            <th>Team</th>
                            <th>Total goals</th>
                            <th>Assisted goals</th>
                            <th>Yellow cards</th>
                            <th>Red cards</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <NewPlayer onAddPlayer={this.addPlayer} />
                    {this.state.players.map((player) =>
                        ! this.state.isEditing[player._id] ?
                        <Player key={player._id} 
                            player={player} 
                            teams={this.state.teams} 
                            onEdit={this.handleEdit} 
                            onDelete={this.handleDelete} 
                            onView={this.openModal}/>
                        :
                        <EditPlayer key={player._id} 
                            player={this.state.isEditing[player._id]} 
                            teams={this.state.teams} 
                            onCancel={this.handleCancel.bind(this, player._id)} 
                            onChange={this.handleChange.bind(this, player._id)} 
                            onSave={this.handleSave.bind(this, player._id)}/>
                    )}
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

function objectToHtml(player, teams) {
    // LA API DE TRANSFER NO ME DA INFORMACIÓN (NO SE QUE ID TIENE REGISTRADO), ASI QUE ESTO ES PARA PROBAR
    player.transfer = [
        {
            _id: "5e10bf0791492f5897e6c233",
            origin_team_id: 2,
            destiny_team_id: 1,
            transfer_date: "2012-04-23",
            contract_years: 0,
            cost: 0,
            player_id: "5e10afa6f39caf015a654799"
        },
        {
            _id: "5e10bf0791492f5897e6c234",
            origin_team_id: 1,
            destiny_team_id: 2,
            transfer_date: "2015-07-28",
            contract_years: 4,
            cost: 60000000,
            player_id: "5e10afa6f39caf015a654799"
        },
        {
            _id: "5e10bf0791492f5897e6c235",
            origin_team_id: 1,
            destiny_team_id: 2,
            transfer_date: "2016-08-12",
            contract_years: 5,
            cost: 50000000,
            player_id: "5e10afa6f39caf015a654799"
        }
    ];
    var html = "<div style='padding: 30px'> <h2>Team</h2>";
    html += "<table class='table'><thead><tr>"
        html += "<th>Name</th>";
        html += "<th>Code</th>";
        html += "<th>Country</th>";
        html += "<th>Founded</th>";
        html += "<th>Venue</th>";
        html += "<th>Surface</th>";
        html += "<th>Address</th>";
        html += "<th>City</th>";
        html += "<th>Capacity</th>";
        html += "<th>Budget</th>";
        html += "<th>Value</th>";
    html += "</tr></thead><tr>";
        html += "<td>" + player.team.name + "</td>";
        html += "<td>" + player.team.code + "</td>";
        html += "<td>" + player.team.country + "</td>";
        html += "<td>" + player.team.founded + "</td>";
        html += "<td>" + player.team.venue_name + "</td>";
        html += "<td>" + player.team.venue_surface + "</td>";
        html += "<td>" + player.team.venue_city + "</td>";
        html += "<td>" + player.team.venue_capacity + "</td>";
        html += "<td>" + player.team.budget + "</td>";
        html += "<td>" + player.team.value + "</td>";
        html += "<td>" + player.team.team_id + "</td>";
    html += "</tr></table><br>";

    html += "<h2>Transfers</h2>";
    html += "<table class='table'><thead><tr>"
        html += "<th>Source Team</th>";
        html += "<th>Target Team</th>";
        html += "<th>Player</th>";
        html += "<th>Transfer Date</th>";
        html += "<th>Contract Years</th>";
        html += "<th>Cost</th>";
    html += "</tr></thead>";
    if(player.transfer.length > 0){
        player.transfer.forEach(transfer => {
            var origin = teams.filter(team => transfer.origin_team_id === team.team_id);
            var destiny = teams.filter(team => transfer.destiny_team_id === team.team_id);

            html += "<tr>";
            html += "<td>" + origin[0].name + "</td>";
            html += "<td>" + destiny[0].name + "</td>";
            html += "<td>" + player.player_name + "</td>";
            html += "<td>" + transfer.transfer_date + "</td>";
            html += "<td>" + transfer.contract_years + "</td>";
            html += "<td>" + transfer.cost + "</td>";
            html += "</tr>";
        });
    }
    html += "</table></div>";

    return ReactHtmlParser(html);
}

export default Players;