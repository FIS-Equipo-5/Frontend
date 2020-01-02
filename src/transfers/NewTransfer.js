import React from 'react';

class NewTransfer extends React.Component {

    constructor(props){
        super(props);
        this.state = {_id:'', origin_team_id: '', destiny_team_id: '', transfer_date: '', contract_years: '', cost: '', player_id: ''};
        this.changeTransfer = this.changeTransfer.bind(this);
        this.clickAdd = this.clickAdd.bind(this);
    }

    changeTransfer(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name] : value
        });
    }

    clickAdd(){
        this.props.onAddTransfer(this.state);
        this.setState({
            _id:'', origin_team_id: '', destiny_team_id: '', transfer_date: '', contract_years: '', cost: '', player_id: ''
        })
    }

    render(){
        return(
            <tr>
                <td><input className="form-control" name="origin_team_id" value={this.state.origin_team_id} onChange={this.changeTransfer}/></td>
                <td><input className="form-control" name="destiny_team_id" value={this.state.destiny_team_id} onChange={this.changeTransfer}/></td>
                <td><input className="form-control" name="player_id" value={this.state.player_id} onChange={this.changeTransfer}/></td>
                <td><input className="form-control" name="transfer_date" value={this.state.transfer_date} onChange={this.changeTransfer}/></td>
                <td><input className="form-control" name="contract_years" value={this.state.contract_years} onChange={this.changeTransfer}/></td>
                <td><input className="form-control" name="cost" value={this.state.cost} onChange={this.changeTransfer}/></td>
                <td><button className="btn btn-warning" onClick={this.clickAdd}>Add Transfer</button></td>
            </tr>
        );
    }
}

export default NewTransfer;