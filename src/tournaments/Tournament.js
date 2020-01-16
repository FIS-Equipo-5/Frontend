import React from 'react';
import Modal from 'react-awesome-modal';
import TournamentInit from './TournamentInit';
import TournamentUpdate from './TournamentUpdate';
import TeamsApi from '../teams/TeamsApi';
import TournamentApi from './TournamentApi';
// import ModalComponent from '../common/ModalComponent'

class Tournament extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visibleUpdate: false,
            teams: [],
            tournament: "",
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

    openModalInit() {
        this.getTeams()
        this.setState({
            visible: true
        });
    }

    openModalUpdate(id) {
        this.getTournament(id)
        this.setState({
            visibleUpdate: true
        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }


    closeModalUpdate() {
        this.setState({
            visibleUpdate: false
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


    getTournament(id) {
        TournamentApi.getTournamentById(id,this.state.token).then(
            (result) => {
                if (result.status === "error") {
                    this.setState({
                        errorInfo: []
                    });
                } else {
                    this.setState({
                        tournament: result
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
                    <button className=" btn btn-sm btn-outline-dark" style={{ width: "10%" }} onClick={() => this.openModalInit()}>Init</button>
                    <button className=" btn btn-sm btn-outline-dark" style={{ width: "20%" }} onClick={() => this.openModalUpdate(this.props.tournament._id)}>Update</button>
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

                <Modal visible={this.state.visibleUpdate} width="50%" effect="fadeInUp" onClickAway={() => this.closeModalUpdate()}>
                    <div className='row h-100 justify-content-center align-items-center'>
                        <h1>Update Tournament</h1>
                    </div>


                    <TournamentUpdate key={this.props.tournament._id}
                        tournament={this.props.tournament} 
                        closeModalUpdate={this.closeModalUpdate.bind(this)} 
                    // onSave={this.handleSave.bind(this, player._id)}
                    />


                </Modal>
            </tr>
            
        );
    }
}

export default Tournament;