import React from 'react';
import TournamentApi from './TournamentApi'
import pubsub from 'pubsub-js';

class TournamentInit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            teams: [],
            options: [],
            token: localStorage.getItem("authToken")
        }
        this.tournamentid = props.tournament


        this.handleChange = this.handleChange.bind(this);
        this.initTournament = this.initTournament.bind(this);
        // this.handleCloseError = this.handleCloseError.bind(this);
        // this.handleDelete = this.handleDelete.bind(this);
        // this.handleOpenInfo = this.handleOpenInfo.bind(this);
        // this.handleCloseInfo = this.handleCloseInfo.bind(this);
        // this.totalPages = 1;
    }


    async initTournament() {
        let options =this.state.options
        let value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        await TournamentApi.initTournament(this.tournamentid["_id"],value,this.state.token)

        this.props.onClose()
        //Publica el cambio para el componente de Transfer
        pubsub.publish('TournamentInit', true);
    }

    handleChange(event) {
        this.setState({
            options: event.target.options,

        })


    }




    // componentDidMount(){
    //     this.getTeams();
    // }






    render() {
        return (
            <div>

                <select className="custom-select" multiple onChange={this.handleChange}>
                    {this.props.teams.map((team) =>
                        // <input type="checkbox" name="vehicle1" value="Bike"> I have a bike<br></br>
                        <option key={team.team_id} value={team.team_id}>{team.name}</option>
                    )}
                </select>

                <div className='row h-100 justify-content-center align-items-center'>
                    <button className="btn btn-sm btn-primary" style={{ width: "10%" }} onClick={() => this.initTournament()}>Initialize</button>
                    <button className="btn btn-danger btn-sm" style={{ width: "10%" }} onClick={() => this.props.onClose()}>Close</button>
                </div>
            </div>
        );
    }
}

export default TournamentInit;