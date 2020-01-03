import React from 'react';
import Alert from '../Alert.js';
import NewTransfer from './NewTransfer.js';
import Transfer from './Transfer.js';
import EditTransfer from './EditTransfer.js';
import TransfersApi from './TransfersApi.js'

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
        TransfersApi.getAllTransfers()
            .then( 
                (result) => {
                    this.setState({transfers: result})
                }
                ,(error) => {
                    this.setState({
                        errorInfo: "Problem with connection to server"
                    })
                }
            );
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