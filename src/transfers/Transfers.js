import React from 'react';
import Modal from 'react-awesome-modal';
import loading from './loading.svg';

import Alert from '../Alert.js';
import NewTransfer from './NewTransfer.js';
import Transfer from './Transfer.js';
import EditTransfer from './EditTransfer.js';
import InfoTransfer from './InfoTransfer.js'
import TransfersApi from './TransfersApi.js'
import TeamsApi from '../teams/TeamsApi.js';
import PlayersApi from '../players/PlayersApi.js';

class Transfers extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            errorInfo: null,
            transfers: [],
            teams: [],
            players: [],
            loaded: false,
            visible : false,
            infoModal : "",
            success : null,
            token: localStorage.getItem('authToken') != null ? localStorage.getItem('authToken') : ''
        }

        this.handleDelete = this.handleDelete.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
        this.addTransfer = this.addTransfer.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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

            this.setState({loaded: true})
    }

    async handleDelete(transfer){

        try{
            await TransfersApi.deleteTransfer(transfer._id, this.state.token);
            this.setState({
                success: true,
                errorInfo: "Delete success"
            });
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

    async handleSave(_id,transfer){
        if (transfer.contract_years==="" || transfer.cost==="") {
            this.setState({
                errorInfo: "You must write the cost and the contract years"
            })
        
        }else{
            try{
                await TransfersApi.putTransfer(transfer,this.state.token)
                this.setState({
                    visible: false,
                    infoModal: "",
                    success: true,
                    errorInfo: "Update success"
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

    handleCloseError(){
        this.setState({
            errorInfo: null,
            success: null
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
                this.setState({
                    success: true,
                    visible: false,
                    infoModal: "",
                    errorInfo: "Transfer added"
                });
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

    openModal(transfer, show) {
        let info;
        if(show === "info"){
            info = <InfoTransfer transfer={transfer} teams={this.state.teams} players={this.state.players} onCloseModal={this.closeModal}/>;
                this.setState({
                    infoModal: info,
                    visible : true
            });
        }else if(show === "edit"){
            info = <EditTransfer key={transfer._id} 
                transfer = {transfer}
                teams={this.state.teams} 
                players={this.state.players} 
                onCloseModal={this.closeModal}
                onSave={this.handleSave.bind(this, transfer._id)}/>;
                this.setState({
                    infoModal: info,
                    visible : true
            });
        }else if("create"){
            info = <NewTransfer onAddTransfer={this.addTransfer} teams={this.state.teams} players={this.state.players} onCloseModal={this.closeModal}/>
            this.setState({
                infoModal: info,
                visible : true
            });
        }
    }

    closeModal() {
        this.setState({
            visible : false,
            infoModal: ""
        });
    }

    content(){
        return(
            <div>
                <Modal 
                    visible={this.state.visible}
                    width="90%"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                >
                    <div>
                        <Alert message={this.state.errorInfo} onClose={this.handleCloseError}/>
                        {this.state.infoModal}
                    </div>
                </Modal>
                <Alert message={this.state.errorInfo} success={this.state.success} onClose={this.handleCloseError} />
                <table className="table">
                    <thead>
                        <tr>
                            <th>Source Team</th>
                            <th>Target Team</th>
                            <th>Player</th>
                            <th>Transfer Date</th>
                            <th>Contract Years</th>
                            <th>Cost</th>
                            <th><button className="btn btn-success" onClick={() => this.openModal("", "create")}>Add Transfer</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.transfers.map((transfer) =>
                            <Transfer key={transfer._id} 
                                transfer={transfer}
                                teams={this.state.teams} 
                                players={this.state.players}
                                onDelete={this.handleDelete} 
                                onView={this.openModal}/>
                        )}
                    </tbody>
                    
                </table>                
            </div>

        );
    }

    render(){
        const mystyle = {
            width: 160,
            height: 160,
            resizeMode: 'stretch',
            marginTop: "5%",
            marginLeft: "44%",
            marginBottom: "6%"
        };
          
        return(
            this.state.loaded ? this.content() : <img src={loading}  className="App-logo" alt="logo" style={mystyle}/>
        )
    }
}

export default Transfers;