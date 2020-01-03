import React from 'react';
import DatePicker from "react-datepicker";
import TeamsApi from '../teams/TeamsApi.js'
import "react-datepicker/dist/react-datepicker.css";

class NewTransfer extends React.Component {

    constructor(props){
        super(props);
        this.token= props.token
        this.state = {_id:'', origin_team_id: '', destiny_team_id: '', transfer_date: new Date(), contract_years: '', cost: '', player_id: ''};
        this.teams = [];
        this.changeTransfer = this.changeTransfer.bind(this);
        this.clickAdd = this.clickAdd.bind(this);
        this.handleContractYearsChange = this.handleContractYearsChange.bind(this)
        this.handleCostChange = this.handleCostChange.bind(this)
    }

    componentDidMount(){
        TeamsApi.getAllTeams(this.token)
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
                        errorInfo: "Problem with connection to server"
                    })
                }
            );
    }

    changeTransfer(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name] : value
        });
    }

    handleDateChange = date => {
        this.setState({
            transfer_date: date
        });
      }

    handleContractYearsChange(event) {
        const number = (event.target.validity.valid) ? event.target.value : this.state.contract_years;
        this.setState({ contract_years: number });
    }

    handleCostChange(event) {
        const number = (event.target.validity.valid) ? event.target.value : this.state.cost;
        this.setState({ cost: number });
    }

    clickAdd(){
        this.props.onAddTransfer(this.state);
        this.setState({
            _id:'', origin_team_id: '', destiny_team_id: '', transfer_date: new Date(), contract_years: '', cost: '', player_id: ''
        })
    }

    render(){
        return(
            <tr>
                <td>
                    <select className="form-control" id="origin_team_id" name="origin_team_id" value={this.state.origin_team_id} onChange={this.changeTransfer}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </td>
                <td>
                    <select className="form-control" id="destiny_team_id" name="destiny_team_id" value={this.state.destiny_team_id} onChange={this.changeTransfer}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </td>
                <td>
                    <select className="form-control" id="player_id" name="player_id" value={this.state.player_id} onChange={this.changeTransfer}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </td>
                <td>
                    <DatePicker name="transfer_date" selected={this.state.transfer_date} onChange={this.handleDateChange} value={this.state.transfer_date} dateFormat="yyyy-MM-dd"/>
                </td>
                <td>
                    <input className="form-control" name="contract_years" type="text" pattern="[0-9]*" value={this.state.contract_years} onChange={this.handleContractYearsChange} maxLength="1" />
                </td>
                <td>
                    <input className="form-control" name="cost" type="text" pattern="[0-9]*" value={this.state.cost} onChange={this.handleCostChange} maxLength="9" />
                </td>
                <td>
                    <button className="btn btn-warning" onClick={this.clickAdd}>Add Transfer</button>
                </td>
            </tr>
        );
    }
}

export default NewTransfer;