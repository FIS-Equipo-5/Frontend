import React from 'react';
import Alert from '../Alert.js';
import NewTransfer from './NewTransfer.js';
import Transfer from './Transfer.js';
import EditTransfer from './EditTransfer.js';
import TransfersApi from './TransfersApi.js'
import TeamsApi from '../teams/TeamsApi.js';
import PlayersApi from '../players/PlayersApi.js';

class Transfers extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            errorInfo: null,
            transfers: [],
            isEditing: {},
            token: localStorage.getItem('authToken') != null ? localStorage.getItem('authToken') : ''
        }
        
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onAddTransfer = this.addTransfer.bind(this);
        this.teams = []
        this.players = []
        this.getAllTeams();
        this.getAllPlayers();
    }


    componentDidMount(){
        TransfersApi.getAllTransfers(this.state.token)
            .then( 
                (result) => {
                    if(result.status==="error"){
                        this.setState({ 
                            transfers: [],
                            errorInfo: result.message})
                    }else{
                        this.setState({transfers: result})
                    }
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
        if(transfer.origin_team_id==="" || transfer.destiny_team_id==="" || transfer.transfer_date==="" || transfer.contract_years==="" || transfer.cost==="" ){
            this.setState({
                errorInfo: "You must write all the transfer fields"
            })
        
        }else{
            try{
                await TransfersApi.postTransfer(transfer, this.state.token)
            }catch(err){
                this.setState({
                    errorInfo: "Failed when inserting the new transfer!"
                })
            }
    
            try{
                let allTransfers = await TransfersApi.getAllTransfers(this.state.token);
                this.setState({
                        transfers: allTransfers
                    }
                )
            }catch (err){
                this.setState({
                    errorInfo: "Problem with connection to server"
                })
            }
        }

    }

    handleCancel(_id, transfer) {
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

    async handleSave(_id,transfer){
        if (transfer.contract_years==="" || transfer.cost==="") {
            this.setState({
                errorInfo: "You must write the cost and the contract years"
            })
        
        }else{
            try{
                await TransfersApi.putTransfer(transfer,this.state.token)
                const isEditing = Object.assign({}, this.state.isEditing);
                delete isEditing[_id];
                this.setState({
                    isEditing: isEditing
                })
            }catch(err){
                this.setState({
                    errorInfo: "Failed when updating the transfer!"
                })
            }
    
            try{
                let allTransfers = await TransfersApi.getAllTransfers(this.state.token);
                this.setState({
                        transfers: allTransfers
                    }
                )
            }catch (err){
                this.setState({
                    errorInfo: "Problem with connection to server"
                })
            }
        }
    }

    async handleDelete(transfer){

        try{
            await TransfersApi.deleteTransfer(transfer._id, this.state.token);
        }catch(err){
            this.setState({
                errorInfo: "Failed when deleting the transfer!"
            })
        }

        try{
            let allTransfers = await TransfersApi.getAllTransfers(this.state.token);
            this.setState({
                    transfers: allTransfers
                }
            )
        }catch (err){
            this.setState({
                errorInfo: "Problem with connection to server"
            })
        }

    }

    getAllTeams(){
        TeamsApi.getAllTeams(this.state.token)
            .then( 
                (result) => {
                    if(result.status==="error"){
                        this.setState({
                            errorInfo: "Problem with connection to server",
                        })
                        this.teams = []
                    }else{
                        this.teams = result
                    }
                }
                ,(error) => {
                    this.setState({
                        errorInfo: "Problem with connection to server",
                    })
                    this.teams = []
                }
            );
    }

    getAllPlayers(){
        PlayersApi.getAllPlayers(this.state.token)
            .then( 
                (result) => {
                    if(result.status==="error"){
                        this.setState({
                            errorInfo: "Problem with connection to server",
                        })
                        this.players = []
                    }else{
                        this.players = result
                    }
                }
                ,(error) => {
                    this.setState({
                        errorInfo: "Problem with connection to server",
                    })
                    this.players = []
                }
            );

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
                        <NewTransfer onAddTransfer={this.onAddTransfer} token={this.state.token}></NewTransfer>
                        {this.state.transfers.map((transfer) => 
                            ! this.state.isEditing[transfer._id] ?
                            <Transfer key={transfer._id} transfer={transfer} teams={this.teams} players={this.players} onEdit={this.handleEdit} onDelete={this.handleDelete}/>
                            :
                            <EditTransfer key={transfer._id} transfer={this.state.isEditing[transfer._id]} 
                                teams={this.teams} players={this.players}
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