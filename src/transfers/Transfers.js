import React from 'react';
import Alert from '../Alert.js';
import NewTransfer from './NewTransfer.js';
import Transfer from './Transfer.js';
import EditTransfer from './EditTransfer.js';

class Transfers extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            errorInfo: null,
            transfers: [],
            isEditing: {}
        }
        
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onAddTransfer = this.addTransfer.bind(this);
    }

    componentDidMount(){
        console.log("STATE1: ", this.state.transfers)
        //TODO
        const array = [{
            _id: "5e0e23b0bfe3e284c18c7000",
            origin_team_id: 1,
            destiny_team_id: 2,
            transfer_date: "2012-08-23T18:25:43.511Z",
            contract_years: 3,
            cost: 29000000.32,
            player_id: "5e03798cdd55f57bb7cd7b10"
        },
        {
            _id: "5e0e23b0bfe3e284c18c7001",
            origin_team_id: 3,
            destiny_team_id: 1,
            transfer_date: "2014-08-29T16:45:43.511Z",
            contract_years: 3,
            cost: 29000000.32,
            player_id: "5e03798cdd55f57bb7cd7b11"
        },
        {
            _id: "5e0e23b0bfe3e284c18c7002",
            origin_team_id: 3,
            destiny_team_id: 2,
            transfer_date: "2017-01-18T19:32:43.511Z",
            contract_years: 4,
            cost: 75055060.32,
            player_id: "5e03798cdd55f57bb7cd7b11"
        },
        {
            _id: "5e0e23b0bfe3e284c18c7003",
            origin_team_id: 5,
            destiny_team_id: 2,
            transfer_date: "2019-01-22T22:15:43.511Z",
            contract_years: 2,
            cost: 12057450.32,
            player_id: "5e03798cdd55f57bb7cd7b11"
        },
        {
            _id: "5e0e23b0bfe3e284c18c7004",
            origin_team_id: 4,
            destiny_team_id: 2,
            transfer_date: "2019-08-12T21:08:43.511Z",
            contract_years: 1,
            cost: 3204123.32,
            player_id: "5e03798cdd55f57bb7cd7b11"
        },
        {
            _id: "5e0e23b0bfe3e284c18c7005",
            origin_team_id: 2,
            destiny_team_id: 3,
            transfer_date: "2015-07-28T23:04:43.511Z",
            contract_years: 4,
            cost: 75055060.32,
            player_id: "5e03798cdd55f57bb7cd7b10"
        },
        {
            _id: "5e0e23b0bfe3e284c18c7006",
            origin_team_id: 4,
            destiny_team_id: 5,
            transfer_date: "2016-08-12T01:21:43.511Z",
            contract_years: 2,
            cost: 12057450.32,
            player_id: "5e03798cdd55f57bb7cd7b10"
        },
        {
            _id: "5e0e23b0bfe3e284c18c7007",
            origin_team_id: 4,
            destiny_team_id: 6,
            transfer_date: "2018-07-04T11:35:43.511Z",
            contract_years: 1,
            cost: 3204123.32,
            player_id: "5e03798cdd55f57bb7cd7b10"
        }]

        this.setState({transfers: array})

        console.log("STATE2: ", this.state.transfers)
    }

    handleEdit (transfer) {
        this.setState( prevState => ({
            isEditing: {...prevState.isEditing, [transfer._id]: transfer}
        }));
    }

    handleCloseError(){
        this.setState({
            errorInfo: null
        });
    }

    async addTransfer(transfer){
        //TODO
    }

    handleCancel(_id) {
        this.setState(prevState => {
            const isEditing = Object.assign({}, prevState.isEditing);
            delete isEditing[_id];
            return{
                isEditing: isEditing
            }
        });
    }

    handleChange(_id, transfer) {
        this.setState(prevState => ({
            isEditing: {...prevState.isEditing, [_id]: transfer}
        }))
    }

    async handleSave(_id, transfer){
        //TODO:
    }

    async handleDelete(transfer){
        //TODO:
    }

    render(){
        return(
            <div>
                <Alert message={this.state.errorInfo} onClose={this.handleCloseError}/>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Source Team</th>
                            <th>Target Team</th>
                            <th>Player</th>
                            <th>Transfer Date</th>
                            <th>Contract Years</th>
                            <th>Cost</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        <NewTransfer onAddTransfer={this.onAddTransfer}></NewTransfer>
                        {this.state.transfers.map((transfer) => 
                            ! this.state.isEditing[transfer._id] ?
                            <Transfer key={transfer._id} transfer={transfer} onEdit={this.handleEdit} onDelete={this.handleDelete}/>
                            :
                            <EditTransfer key={transfer._id} transfer={this.state.isEditing[transfer._id]} 
                                onCancel={this.handleCancel.bind(this, transfer._id)}
                                onChange={this.handleChange.bind(this, transfer._id)}
                                onSave={this.handleSave.bind(this, transfer._id)}></EditTransfer>
                        )}
                    </tbody>
                    
                </table>                
            </div>

        );
    }
}

export default Transfers;