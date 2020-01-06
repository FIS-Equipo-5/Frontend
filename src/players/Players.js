import React from 'react';
import Player from './Player.js';
import Alert from '../Alert.js';
import NewPlayer from './NewPlayer.js';
import EditPlayer from './EditPlayer.js';

class Players extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            errorInfo: null,
            players: this.props.players,
            isEditing: {}
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handeCloseError = this.handeCloseError.bind(this);
        this.addPlayer = this.addPlayer.bind(this);
    }

    handleEdit(player) {
        this.setState(prevState => ({
            isEditing: {...prevState.isEditing, [player._id]: player}
        }));
    }

    handleDelete(player) {
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

            const players = prevState.players;
            const pos = players.findIndex(p => p._id === player._id);
            if(validatePlayer(player)){
                return{
                    players : [...players.slice(0, pos), Object.assign({}, player), ...players.slice(pos+1)],
                    isEditing: isEditing
                }
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
                return({
                    players: [...prevState.players, player]
                });
            } else {
                return({
                    errorInfo: 'Some info is empty'
                });
            }
            
        });
    }

    render() {
        return(
            <div>
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
                            <th>Team ID</th>
                            <th>Total goals</th>
                            <th>Assisted goals</th>
                            <th>Yellow cards</th>
                            <th>Red cards</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <NewPlayer onAddPlayer={this.addPlayer}/>
                    {this.state.players.map((player) =>
                        ! this.state.isEditing[player._id] ?
                        <Player key={player._id} player={player} 
                            onEdit={this.handleEdit} 
                            onDelete={this.handleDelete}/>
                        :
                        <EditPlayer key={player._id} player={this.state.isEditing[player._id]} 
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

export default Players;