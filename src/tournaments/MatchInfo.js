import React from 'react';
import TeamsApi from '../teams/TeamsApi';
import Modal from 'react-awesome-modal';
import MatchEdit from './MatchEdit'



class MatchInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            teams: [],
            token: localStorage.getItem("authToken")
        }
        this.stats = props.match.stats;
        if (typeof this.stats === 'undefined') {
            this.stats = { localScore: "0", visitorScore: "0" }
        }
        
        this.score = this.stats.localScore + ' - ' + this.stats.visitorScore;
        this.date = props.match.matchDate;
        this.formatDate = this.date.substring(8, 10) + "/"
            + this.date.substring(5, 7) + "/"
            + this.date.substring(0, 4)

        this.weather = '';
        this.icon = '';
       
        if (props.match.weather === 'no weather data') {
            this.weather = props.match.weather;
        } else {
            this.weather = props.match.weather[0].weather[0].description;
            let iconPic = props.match.weather[0].weather[0].icon.match(/\d+/);
            this.icon = "http://openweathermap.org/img/wn/" + iconPic + "d@2x.png";
        }
        // this.handleEdit = this.handleEdit.bind(this);
        // this.handleCloseError = this.handleCloseError.bind(this);
        // this.handleDelete = this.handleDelete.bind(this);
        // this.handleOpenInfo = this.handleOpenInfo.bind(this);
        // this.handleCloseInfo = this.handleCloseInfo.bind(this);
        // this.totalPages = 1;
    }

    // componentDidMount(){
    //     this.getTeams();
    // }

    openModal() {
        this.setState({
            visible: true
        });
        this.getTeams();
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
                        errorInfo: result.message
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
            <div>
                <table className="table" align='center'>
                    <thead>
                        <tr>
                            <th>Local</th>
                            <th>Visitor</th>
                            <th>Date</th>
                            <th>Score</th>
                            <th>Venue</th>
                            <th>Weather</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>{this.props.match.localTeamName}</td>
                            <td>{this.props.match.visitorTeamName}</td>
                            <td>{this.formatDate}</td>
                            <td>{this.score}</td>
                            <td>{this.props.match.venue_city}</td>


                            {this.weather === 'no weather data' ?
                                <td>this.weather</td>
                                :
                                <td>{this.weather} <img style={{ width: "20%" }} src={this.icon} alt='icon' /></td>}

                        </tr>
                    </tbody>
                </table>

                <div className='row justify-content-center align-items-center'>
                    <button className="btn btn-sm btn-primary" style={{ width: "10%" }} onClick={() => this.openModal()}>Edit</button>
                    <button className="btn btn-danger btn-sm" style={{ width: "10%" }} onClick={() => this.props.onCloseInfo()}>Close</button>
                </div>

                <Modal visible={this.state.visible} width="50%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div className='row h-100 justify-content-center align-items-center'>
                        <h1>Edit match</h1>
                    </div>

                    <MatchEdit key={this.props.match._id}
                        match={this.props.match}
                        teams={this.state.teams}
                    // onCancel={this.handleCancel.bind(this, player._id)} 
                    // onChange={this.handleChange.bind(this, player._id)} 
                    // onSave={this.handleSave.bind(this, player._id)}
                    />

                    <div className='row h-100 justify-content-center align-items-center'>
                        <button className="btn btn-sm btn-primary" style={{ width: "10%" }} onClick={() => this.closeModal()}><i className="fa fa-save" /></button>
                        <button className="btn btn-danger btn-sm" style={{ width: "10%" }} onClick={() => this.closeModal()}>Close</button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default MatchInfo;