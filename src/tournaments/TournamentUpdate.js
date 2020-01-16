import React from 'react';
import moment from 'moment';
import TournamentApi from './TournamentApi';



class TournamentUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tournament: this.props.tournament,
            options: [],
            errorInfo:"",
            token: localStorage.getItem("authToken")
        }
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event){
        var tournamentEdited = {...this.state.tournament, [event.target.name]: event.target.value};
        this.setState({
            tournament: tournamentEdited
        });
    }

    onSave(tournament){
        TournamentApi.putTournamentById(tournament,this.state.token).then(
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

        this.props.closeModalUpdate()

    }

    render() {
        return (
            <div style={{padding: "30px"}}>
                <h1>Update Tournament</h1>
                <form>
                    <div className="form-group row">
                        <label className="col-sm-1 col-form-label">Name:</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="name" value={this.state.tournament.name} onChange={this.handleChange}/>
                        </div>
                        <label className="col-sm-1 col-form-label">Firstname:</label>
                        <div className="col-sm-3">
                            <input  type="date" className="form-control" name="startDate" value={moment(this.state.tournament.startDate).format('YYYY-MM-DD')} onChange={this.handleChange}/>
                        </div>
                        <label className="col-sm-1 col-form-label">Lastname:</label>
                        <div className="col-sm-3">
                            <input  type="date" className="form-control" name="endDate" value={moment(this.state.tournament.endDate).format('YYYY-MM-DD')} onChange={this.handleChange}/>
                        </div>
                    </div>
               </form>
                <div className="row" style={{float:"right"}}>
                    <button className="btn btn-success" onClick={() => this.onSave(this.state.tournament)}>Save</button>
                    <button className="btn btn-danger" onClick={() => this.props.closeModalUpdate()}>Close</button>        
                </div>
            </div>
        );
    }
}

export default TournamentUpdate;