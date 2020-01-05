import React from 'react';
import Alert from '../Alert.js';
import MatchApi from './MatchApi'
import Match from './Match'

class Matches extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errorInfo: null,
            matches: [],
            isEditing: {},
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMGUwMjE3NmM2ZWYxMDAwZmRiMjY5OCIsImlhdCI6MTU3ODI0MzY3MiwiZXhwIjoxNTc4MjQ3MjcyfQ.ikUJgC5BwIBkGopIJEXqQOO4v2btIqRHKju034bnVCs'
        }

        this.handleEdit = this.handleEdit.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.matches = []
        this.getAllMatches();
    }


    componentDidMount() {
        MatchApi.getAllMatches(this.state.token)
            .then(
                (result) => {
                    if (result.status === "error") {
                        this.setState({
                            matches: [],
                            errorInfo: result.message
                        })
                    } else {
                        this.setState({ matches: result })
                    }
                },
                (error) => {
                    this.setState({
                        errorInfo: "Problem with connection to server"
                    })
                }
            );
    }

    handleEdit(match) {
        this.setState(prevState => ({
            isEditing: { ...prevState.isEditing, [match._id]: match }
        }));
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
            let allMatches = await MatchApi.getAllMatches(this.state.token);
            this.setState({
                matches: allMatches
            }
            )
        } catch (err) {
            this.setState({
                errorInfo: "Problem with connection to server"
            })
        }

    }

    getAllMatches() {
        MatchApi.getAllMatches(this.state.token)
            .then(
                (result) => {
                    if (result.status === "error") {
                        this.setState({
                            errorInfo: "Problem with connection to server",
                        })
                        this.matches = []
                    } else {
                        this.matches = result
                    }
                }
                , (error) => {
                    this.setState({
                        errorInfo: "Problem with connection to server",
                    })
                    this.matches = []
                }
            );

    }

    render() {

        return (
            <div>
                <Alert message={this.state.errorInfo} onClose={this.handleCloseError} />
                <table className="table">
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
                                <Match key={match._id} match={match} onEdit={this.handleEdit} onDelete={this.handleDelete} />
                                // :
                                // <EditTransfer key={transfer._id} transfer={this.state.isEditing[transfer._id]}
                                //     teams={this.teams} players={this.players}
                                //     onCancel={this.handleCancel.bind(this, transfer._id)}
                                //     onChange={this.handleChange.bind(this, transfer._id)}
                                //     onSave={this.handleSave.bind(this, transfer._id)}></EditTransfer>
                            )}
                        </tbody>

                </table>
            </div>

        );
    }
}

export default Matches;