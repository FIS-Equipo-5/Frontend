import React from 'react';
import Modal from 'react-awesome-modal';
import TournamentInit from './TournamentInit';
import TeamsApi from '../teams/TeamsApi';
// import ModalComponent from '../common/ModalComponent'

class Tournament extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            teams: [],
            token: localStorage.getItem("authToken")


        }
        this.startdate = props.tournament.startDate;
        this.startdate = this.startdate.substring(8, 10) + "/"
            + this.startdate.substring(5, 7) + "/"
            + this.startdate.substring(0, 4);
        this.enddate = props.tournament.endDate;
        this.enddate = this.enddate.substring(8, 10) + "/"
            + this.enddate.substring(5, 7) + "/"
            + this.enddate.substring(0, 4);
        this.getTeams = this.getTeams.bind(this);
    }

    openModal() {
        this.getTeams()
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }



    getTeams() {
        TeamsApi.getAllTeams(this.state.token).then(
            (result) => {
                if (result.status === "error") {
                    this.setState({
                        errorInfo: []
                    });
                } else {
                    this.setState({
                        teams: result
                    })
                }
            },
            (error) => {
                console.log("Error: " + error.message);
                this.setState({
                    errorInfo: "Problem retrieving teams"
                })
            }
        )
    }

    render() {
        return (
            <tr>
                <td>{this.props.tournament.name}</td>
                <td>{this.startdate}</td>
                <td>{this.enddate}</td>
                <td>
                    <button className=" btn btn-sm btn-outline-dark" style={{ width: "20%" }} onClick={() => this.props.onDelete(this.props.tournament)}>Delete</button>
                    <button className=" btn btn-sm btn-outline-dark" style={{ width: "10%" }} onClick={() => this.openModal()}>Init</button>
                    <button className=" btn btn-sm btn-outline-dark" style={{ width: "20%" }} onClick={() => this.props.onDelete(this.props.tournament)}>Update</button>
                    <button className=" btn btn-sm btn-outline-dark" onClick={() => this.props.onSelect(this.props.tournament._id)}>View Matches</button>
                </td>
                <Modal visible={this.state.visible} width="50%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div className='row h-100 justify-content-center align-items-center'>
                        <h1>Initialize Tournament</h1>
                    </div>

                    <TournamentInit key={this.props.tournament._id}
                        tournament={this.props.tournament}
                        teams={this.state.teams} 
                        onClose={this.closeModal.bind(this)} 
                    // onSave={this.handleSave.bind(this, player._id)}
                    />


                </Modal>
            </tr>
            
        );
    }
}

export default Tournament;