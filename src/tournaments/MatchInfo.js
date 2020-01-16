import React from 'react';
import TeamsApi from '../teams/TeamsApi';
import MatchApi from '../tournaments/MatchApi';
import Modal from 'react-awesome-modal';
import MatchEdit from './MatchEdit'
import Alert from '../Alert.js';



class MatchInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            match: props.match,
            visible: false,
            teams: [],
            errorInfo: null,
            success: null,
            token: localStorage.getItem("authToken"),
            formatDate: '',
            score: '',
            weather: '',
            icon: ''
        }
        this.handeCloseError = this.handeCloseError.bind(this);

        this.stats = this.state.match.stats;
        if (typeof this.stats === 'undefined') {
            this.stats = { localScore: "0", visitorScore: "0" }
            this.state.match.stats = { localScore: "0", visitorScore: "0" };
        }
        this.state.score = this.stats.localScore + ' - ' + this.stats.visitorScore;

        if (this.state.match.weather === 'no weather data') {
            this.state.weather = 'no weather data';
        } else {
            let iconPic = this.state.match.weather[0].weather[0].icon.match(/\d+/);
            let icon = "http://openweathermap.org/img/wn/" + iconPic + "d@2x.png";
            this.state.weather = this.state.match.weather[0].weather[0].description;
            this.state.icon = icon;
        }

        let date = this.state.match.matchDate;
        this.state.formatDate = date.substring(8, 10) + "/" + date.substring(5, 7) + "/" + date.substring(0, 4);
    }

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

    handleSave(id, match) {

        console.log('save', match);
        MatchApi.putMatchById(match, this.state.token)
            .then((data) => (data.json()))
            .then((result) => {
                console.log('result', result);
                let icon = ''
                let weather = '';
                if (result.weather === 'no weather data') {
                    weather = 'no weather data';
                } else {
                    let iconPic = result.weather[0].weather[0].icon.match(/\d+/);
                    icon = "http://openweathermap.org/img/wn/" + iconPic + "d@2x.png"
                    weather = result.weather[0].weather[0].description;
                }

                let date = result.matchDate;
                let formatDate = date.substring(8, 10) + "/" + date.substring(5, 7) + "/" + date.substring(0, 4);

                this.stats = result.stats;
                if (typeof this.stats === 'undefined') {
                    this.stats = { localScore: "0", visitorScore: "0" }
                    match.stats = { localScore: "0", visitorScore: "0" };
                }

                this.setState({
                    success: true,
                    errorInfo: "Saved match",
                    match: match,
                    visible: false,
                    weather: weather,
                    icon: icon,
                    formatDate: formatDate,
                    score: this.stats.localScore + ' - ' + this.stats.visitorScore
                });
                console.log('updated wea', weather);


            },
                (error) => {
                    this.setState({
                        errorInfo: "Cannot modify the match, try again",
                        success: false,
                        visible: false
                    });
                })
    }

    handeCloseError(id) {
        this.setState({
            errorInfo: null,
        });
    }



    render() {
        return (
            <div>
                <Alert message={this.state.errorInfo} success={this.state.success} onClose={this.handeCloseError} />

                <div className='container'>
                    <div className='row mb-3 h-100 justify-content-center align-items-center'>
                        <div className='col-4' style={{ 'fontWeight': 'bold' }}>
                            Local team:
                        </div>
                        <div className='col-8'>
                            {this.state.match.localTeamName}
                        </div>
                    </div>
                    <div className='row mb-3 h-100 justify-content-center align-items-center'>

                        <div className='col-4' style={{ 'fontWeight': 'bold' }}>
                            Visitor team:
                        </div>
                        <div className='col-8'>
                            {this.state.match.visitorTeamName}
                        </div>
                    </div>
                    <div className='row mb-3 h-100 justify-content-center align-items-center'>
                        <div className='col-4' style={{ 'fontWeight': 'bold' }}>
                            Score:
                        </div>
                        <div className='col-8'>
                            {this.state.score}
                        </div>
                    </div>
                    <div className='row mb-3 h-100 justify-content-center align-items-center'>

                        <div className='col-4' style={{ 'fontWeight': 'bold' }}>
                            Date:
                        </div>
                        <div className='col-8'>
                            {this.state.formatDate}
                        </div>
                    </div>
                    <div className='row mb-3 h-100 justify-content-center align-items-center'>
                        <div className='col-4' style={{ 'fontWeight': 'bold' }}>
                            Venue:
                        </div>
                        <div className='col-8'>
                            {this.state.match.venue_city}
                        </div>

                    </div>
                    <div className='row mb-3 h-100 justify-content-center align-items-center'>
                        <div className='col-4' style={{ 'fontWeight': 'bold' }}>
                            Weather:
                        </div>
                        {this.state.weather === 'no weather data' ?
                            <div className='col-8'>
                                {this.state.weather}
                            </div>
                            :
                            <div className='col-8'>
                                {this.state.weather} <img style={{ width: "20%" }} src={this.state.icon} alt='icon' />
                            </div>
                        }
                    </div>
                </div>


                <div className='row justify-content-center align-items-center'>
                    <button className="btn btn-primary btn-sm" style={{ width: "20%" }} onClick={() => this.openModal()}><i className="fa fa-pencil"></i></button>

                    <button className="btn btn-danger btn-sm" style={{ width: "20%" }} onClick={() => this.props.onCloseInfo()}>Close</button>
                </div>

                <Modal visible={this.state.visible} width="50%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div className='row h-100 justify-content-center align-items-center'>
                        <h1>Edit match</h1>
                    </div>

                    <MatchEdit key={this.state.match._id}
                        match={this.state.match}
                        teams={this.state.teams}
                        onCancel={this.closeModal.bind(this)}
                        onSave={this.handleSave.bind(this, this.state.match)}
                    />

                </Modal>
            </div>
        );
    }
}



export default MatchInfo;