import React from 'react';
import Alert from '../Alert.js';
import MatchApi from './MatchApi'
import Match from './Match'
import MatchInfo from './MatchInfo'

class Matches extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errorInfo: null,
            matches: props.matches ? props.matches : [],
            selectedTournament: props.selectedTournament ? props.selectedTournament : null,
            currentPage: 1,
            totalPages: 1,
            isEditing: {},
            token: localStorage.getItem("authToken")
        }

        this.handleEdit = this.handleEdit.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleOpenInfo = this.handleOpenInfo.bind(this);
        this.handleCloseInfo = this.handleCloseInfo.bind(this);
        this.totalPages = 1;
    }


    componentDidMount() {
        this.getAllMatches(0);
    }

    componentDidUpdate(prevProps) {

        if (prevProps.selectedTournament !== this.props.selectedTournament && !this.props.selectedTournament) {
            this.setState({ selectedTournament: null, currentPage: this.state.currentPage });
            this.getAllMatches(0);
        } else if (prevProps.selectedTournament !== this.props.selectedTournament) {
            this.setState({ selectedTournament: this.props.selectedTournament });
            this.getMatchetsByTournament(0);
        }
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

    handleOpenInfo(match) {
        MatchApi.getMatchById(this.state.token, match._id)
            .then(
                (result) => {
                    if (result.status === "error") {
                        this.setState({
                            errorInfo: "Problem with connection to server: " + result.message,
                        })
                        this.setState({ matchSelected: null });
                    } else {
                        this.setState({ matchSelected: result });
                    }
                }
                , (error) => {
                    this.setState({
                        errorInfo: "Problem with connection to server",
                    })
                    this.setState({ matchSelected: null });
                }
            );

    }

    handleCloseInfo() {
        this.setState({ matchSelected: null });
    }

    async handleSave(_id, match) {
        // // if (transfer.contract_years === "" || transfer.cost === "") {
        // //     this.setState({
        // //         errorInfo: "You must write the cost and the contract years"
        // //     })

        // // } else {
        // try {
        //     await MatchApi.putMatchById(match, this.state.token)
        //     const isEditing = Object.assign({}, this.state.isEditing);
        //     delete isEditing[_id];
        //     this.setState({
        //         isEditing: isEditing
        //     })
        // } catch (err) {
        //     this.setState({
        //         errorInfo: "Failed when updating the transfer!"
        //     })
        // }

        // try {
        //     let allMatches = await MatchApi.getAllMatches(this.state.token);
        //     this.setState({
        //         transfers: allTransfers
        //     }
        //     )
        // } catch (err) {
        //     this.setState({
        //         errorInfo: "Problem with connection to server"
        //     })
        // }
        // // }
    }

    async handleDelete(match) {

        try {
            await MatchApi.deleteMatch(match._id, this.state.token);
        } catch (err) {
            this.setState({
                errorInfo: "Failed when deleting the match!"
            })
        }
        try {
            if (this.state.selectedTournament) {
                this.getMatchetsByTournament(0);
            } else {
                this.getAllMatches(0);
            }
        } catch (err) {
            this.setState({
                errorInfo: "Problem with connection to server"
            })
        }
    }

    getMatchetsByTournament(type) {
        console.log('getMatchetsByTournament: ' + type);
        let currentPage = this.state.currentPage + type;
        if (this.props.selectedTournament) {

            MatchApi.getMatchesByTournament(this.state.token, this.props.selectedTournament, currentPage)
                .then(
                    (result) => {
                        if (result.status === "error") {
                            this.setState({
                                errorInfo: "Problem with connection to server: " + result.message,
                            })
                            this.setState({ matchSelected: null });
                        } else {
                            if (!result.matches) {
                                this.setState({
                                    matches: [],
                                    totalPages: 1,
                                    currentPage: 1
                                });
                            } else {
                                this.setState({
                                    matches: result.matches,
                                    totalPages: result.totalPages,
                                    currentPage: currentPage
                                });
                            }
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
    }
    getAllMatches(type) {
        // this.setState({ selectedTournament: null });
        console.log('getAllMatches: ' + type);

        let currentPage = this.state.currentPage + type;

        MatchApi.getAllMatches(this.state.token, currentPage)
            .then(
                (result) => {
                    if (result.status === "error") {
                        this.setState({
                            errorInfo: "Problem with connection to server: " + result.message,
                        })
                        this.setState({ matches: [] });
                    } else {
                        this.setState({
                            matches: result.matches,
                            totalPages: result.totalPages,
                            currentPage: currentPage
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

        if (this.state.matchSelected) {
            return <MatchInfo key={this.state.matchSelected._id} match={this.state.matchSelected}
                onCloseInfo={this.handleCloseInfo}
                onEdit={this.handleEdit} onDelete={this.handleDelete} />
        } else {
            return (
                <div>
                    <Alert message={this.state.errorInfo} onClose={this.handleCloseError} />

                    <div id='matches'>
                        <table className="table" align='center'>
                            <thead>
                                <tr>
                                    <th>Local</th>
                                    <th>Visitor</th>
                                    <th>Date</th>
                                    <th>Score</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* <Match match={this.matches} token={this.state.token}></Match> */}
                                {this.state.matches.map((match) =>
                                    // !this.state.isEditing[transfer._id] ?
                                    <Match key={match._id} match={match} onOpenInfo={this.handleOpenInfo} onDelete={this.handleDelete} />
                                    // :
                                    // <EditTransfer key={transfer._id} transfer={this.state.isEditing[transfer._id]}
                                    //     teams={this.teams} players={this.players}
                                    //     onCancel={this.handleCancel.bind(this, transfer._id)}
                                    //     onChange={this.handleChange.bind(this, transfer._id)}
                                    //     onSave={this.handleSave.bind(this, transfer._id)}></EditTransfer>
                                )}
                            </tbody>
                        </table>
                        {this.state.selectedTournament ?

                            <div className='row h-100 justify-content-center align-items-center'>
                                <button className="btn btn-outline-dark" disabled={this.state.currentPage <= 1} onClick={() => this.getMatchetsByTournament(-1)}>Previous</button>
                                <span style={{ padding: '0 0 0 15px' }}> Page: {this.state.currentPage} of {this.state.totalPages}</span>
                                <button className="btn btn-outline-dark" disabled={this.state.currentPage >= this.state.totalPages} onClick={() => this.getMatchetsByTournament(1)}>Next</button>
                            </div>
                            :
                            <div className='row h-100 justify-content-center align-items-center'>
                                <button className="btn btn-outline-dark" disabled={this.state.currentPage <= 1} onClick={() => this.getAllMatches(-1)}>Previous</button>
                                <span style={{ padding: '0 0 0 15px' }}> Page: {this.state.currentPage} of {this.state.totalPages}</span>
                                <button className="btn btn-outline-dark" disabled={this.state.currentPage >= this.state.totalPages} onClick={() => this.getAllMatches(1)}>Next</button>
                            </div>
                        }
                    </div>
                </div>

            );
        }
    }
}

export default Matches;