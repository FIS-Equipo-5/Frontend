import React from 'react';
import Alert from '../Alert.js';
import TournamentApi from './TournamentApi'
import Tournament from './Tournament'
import { registerLocale } from 'react-datepicker';
import NewTournament from './NewTournament.js';

class Tournaments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errorInfo: null,
            tournaments: props.tournaments ? props.tournaments : [],
            currentPage: 1,
            totalPages: 1,
            isEditing: {},
            token: localStorage.getItem("authToken")
        }
        console.log('props:'+ JSON.stringify(this.props));
        this.var = props.selectedTournamentCB;
        this.var = this.var.bind(this);
        console.log('this var: '+ this.var);
        // this.handleEdit = this.handleEdit.bind(this);
        // this.handleCloseError = this.handleCloseError.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        // this.handleOpenInfo = this.handleOpenInfo.bind(this);
        // this.handleCloseInfo = this.handleCloseInfo.bind(this);
        // this.totalPages = 1;
        this.onAddTournament = this.addTournament.bind(this);
    }


    async addTournament(tournament){
        if(tournament.name==="" || tournament.startDate==="" || tournament.endDate===""  ){
            this.setState({
                errorInfo: "You must write all the tournament fields"
            })
        
        }else{
            try{
                await TournamentApi.postTournament(tournament, this.state.token)
            }catch(err){
                this.setState({
                    errorInfo: "Failed when inserting the new transfer!"
                })
            }
    
            try{
                let allTournaments = this.getAllTournaments(0);
                // this.setState({
                //     tournaments: allTournaments
                //     }
                // )
            }catch (err){
                this.setState({
                    errorInfo: "Problem with connection to server"
                })
            }
        }

    }


    componentDidMount() {
        this.getAllTournaments(0);
    }

    handleEdit(match) {
        this.setState(prevState => ({
            isEditing: { ...prevState.isEditing, [match._id]: match }
        }));
        this.setState({ matchSelected: match });
    }

    handleCloseError() {
        this.setState({
            errorInfo: null
        });
    }

    handleCancel(_id, match) {
        this.setState(prevState => {
            const isEditing = Object.assign({}, prevState.isEditing);
            delete isEditing[_id];
            return {
                isEditing: isEditing
            }
        });
    }

    handleChange(_id, match) {
        this.setState(prevState => ({
            isEditing: { ...prevState.isEditing, [_id]: match }
        }))
    }

    handleOpenInfo(match) {
        this.setState({ matchSelected: match });
    }

    handleCloseInfo() {
        this.setState({ matchSelected: null });
    }

    async handleDelete(tournament) {

        try {
            await TournamentApi.deleteTournament(tournament._id, this.state.token);
        } catch (err) {
            this.setState({
                errorInfo: "Failed when deleting the match!"
            })
        }

        try {
            this.getAllTournaments(0);
        } catch (err) {
            this.setState({
                errorInfo: "Problem with connection to server"
            })
        }
    }

    getAllTournaments(type) {
        let currentPage = this.state.currentPage + type;

        TournamentApi.getAllTournaments(this.state.token, currentPage)
            .then(
                (result) => {
                    if (result.status === "error") {
                        this.setState({
                            errorInfo: "Problem with connection to server: " + result.message,
                        })
                        this.setState({ matches: [] });
                    } else {
                        this.setState({
                            tournaments: result,
                            //totalPages: result.totalPages,
                            //currentPage: currentPage
                        });
                    }
                }
                , (error) => {
                    this.setState({
                        errorInfo: "Problem with connection to server",
                    })
                    this.setState({ matches: [] });
                }
            );
    }

    

    render() {
        // if (this.state.matchSelected) {
        //     return <MatchInfo key={this.state.matchSelected._id} match={this.state.matchSelected}
        //         onCloseInfo={this.handleCloseInfo}
        //         onEdit={this.handleEdit} onDelete={this.handleDelete} />
        // } else {
            console.log('this.props.handleSelect: '+ this.props.handleSelect);
            return (
                <div>
                    <Alert message={this.state.errorInfo} onClose={this.handleCloseError} />

                    <div id='tournaments'>
                        <table className="table" align='center'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>

                            <tbody>
                            <NewTournament onAddTournament={this.onAddTournament} token={this.state.token}/>
                                {/* <Match match={this.matches} token={this.state.token}></Match>*/}
                                {this.state.tournaments.map((tournament) =>
                                    
                                    // !this.state.isEditing[transfer._id] ?
                                    <Tournament key={tournament._id} tournament={tournament} onDelete={this.handleDelete} onSelect={this.var}/>
                                    // :
                                    // <EditTransfer key={transfer._id} transfer={this.state.isEditing[transfer._id]}
                                    //     teams={this.teams} players={this.players}
                                    //     onCancel={this.handleCancel.bind(this, transfer._id)}
                                    //     onChange={this.handleChange.bind(this, transfer._id)}
                                    //     onSave={this.handleSave.bind(this, transfer._id)}></EditTransfer>
                                )} 
                            </tbody>
                        </table>
                        {/* <div className='row h-100 justify-content-center align-items-center'>
                            <button className="btn btn-outline-dark" disabled={this.state.currentPage <= 1} onClick={() => this.getAllMatches(-1)}>Previous</button>
                            <span style={{ padding: '0 0 0 15px' }}> Page: {this.state.currentPage} of {this.state.totalPages}</span>
                            <button className="btn btn-outline-dark" disabled={this.state.currentPage >= this.state.totalPages} onClick={() => this.getAllMatches(1)}>Next</button>
                        </div> */}
                    </div>
                </div>

            );
        // }
    }
}

export default Tournaments;