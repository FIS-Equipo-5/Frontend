import React from 'react';
import Alert from '../Alert.js';
import NewTransfer from './NewTransfer.js';
import Transfer from './Transfer.js';
import EditTransfer from './EditTransfer.js';
import TransfersApi from './TransfersApi.js'
import TeamsApi from '../teams/TeamsApi.js';
import PlayersApi from '../players/PlayersApi.js';
import loading from './loading.svg';

class Transfers extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            errorInfo: null,
            transfers: [],
            teams: [],
            players: [],
            loaded: false,
            isEditing: {},
            token: localStorage.getItem('authToken') != null ? localStorage.getItem('authToken') : ''
        }
        
        console.log(this.state.loaded)
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onAddTransfer = this.addTransfer.bind(this);
    }


    async componentDidMount(){
        await TransfersApi.getAllTransfers(this.state.token)
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
                        transfers: [],
                        errorInfo: "Problem with connection to server"
                    })
                }
            );

        await TeamsApi.getAllTeams(this.state.token)
            .then( 
                (result) => {
                    if(result.status==="error"){
                        this.setState({ 
                            teams: [],
                            errorInfo: result.message})
                    }else{
                        this.setState({teams: result})
                    }
                }
                ,(error) => {
                    this.setState({
                        teams: [],
                        errorInfo: "Problem with connection to server"
                    })
                }
            );

        await PlayersApi.getAllPlayers(this.state.token)
            .then( 
                (result) => {
                    if(result.status==="error"){
                        this.setState({ 
                            players: [],
                            errorInfo: result.message})
                    }else{
                        this.setState({players: result})
                    }
                }
                ,(error) => {
                    this.setState({
                        players: [],
                        errorInfo: "Problem with connection to server"
                    })
                }
            );

            await this.sleep(6000);
            this.setState({loaded: true})
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

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    content(){
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
                        <NewTransfer onAddTransfer={this.onAddTransfer} teams={this.state.teams} players={this.state.players}></NewTransfer>
                        {this.state.transfers.map((transfer) => 
                            ! this.state.isEditing[transfer._id] ?
                            <Transfer key={transfer._id} transfer={transfer} teams={this.state.teams} players={this.state.players} onEdit={this.handleEdit} onDelete={this.handleDelete}/>
                            :
                            <EditTransfer key={transfer._id} transfer={this.state.isEditing[transfer._id]} 
                                teams={this.state.teams} players={this.state.players}
                                onCancel={this.handleCancel.bind(this, transfer._id)}
                                onChange={this.handleChange.bind(this, transfer._id)}
                                onSave={this.handleSave.bind(this, transfer._id)}></EditTransfer>
                        )}
                    </tbody>
                    
                </table>                
            </div>

        );
    }

    render(){
        const mystyle = {
            width: 90,
            height: 90,
            resizeMode: 'stretch',
            marginTop: "5%",
            marginLeft: "45%",
            marginBottom: "5%"
        };
          
        return(
            this.state.loaded ? this.content() : <img src={loading}  className="App-logo" alt="logo" style={mystyle}/>
        )
    }
}

export default Transfers;