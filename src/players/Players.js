import React from 'react';
import Player from './Player.js';
import Alert from '../Alert.js';

class Players extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            selectedPlayer: null
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handeCloseError = this.handeCloseError.bind(this);
    }

    handleEdit(player) {
        this.setState({
            selectedPlayer: player.player_name
        });
    }

    handeCloseError() {
        this.setState({
            selectedPlayer: null
        });
    }

    render() {
        return(
            <div>
                <Alert message={this.state.selectedPlayer} onClose={this.handeCloseError}/>
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
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
                    {this.props.players.map((player) =>
                        <Player player={player} onEdit={this.handleEdit}/>
                    )}
                </table>
            </div>
        );
    }
}

export default Players;