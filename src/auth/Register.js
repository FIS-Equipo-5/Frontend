import React from 'react';
import AuthApi from './AuthApi.js';
import './auth.css';
import Alert from '.././Alert.js';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            errorInfo: null,
            successInfo:null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
    }

    handleCloseError(){
        this.setState({
            errorInfo: null,
            successInfo: null
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        try {
            AuthApi.register(data.get('name'), data.get('email'), data.get('password')).then((response) => {
                if (response.status != "201") {
                    this.setState({
                        errorInfo: "Failed when registering the user"
                    });
                } else {
                    this.setState({
                        success: true,
                        errorInfo: "User successfully registered"
                    });
                    window.location.href='/';
                }
            });
        } catch (error) {
            this.setState({
                errorInfo: "Failed when registering the user"
            });
        }


    }

    render() {
        return (
            <div class="wrapper fadeInDown">
                <div id="formContent">
                    <div class="fadeIn first">
                        <img src='https://image.freepik.com/vector-gratis/logotipo-futbol-american-logo-sports_1366-100.jpg' id="icon" alt="User Icon" />
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <Alert message={this.state.errorInfo} success={this.state.success} onClose={this.handleCloseError}/>
                        </div>
                        <input type="text" id="name" class="fadeIn second" name="name" type="text" placeholder="Enter your name" />
                        <input type="password" id="email" class="fadeIn third" name="email" type="text" placeholder="Enter your email" />
                        <input type="password" id="password" class="fadeIn fourth" name="password" type="password" placeholder="Enter your password" />
                        <input type="submit" class="fadeIn five" value="Register" />
                    </form>
                    <div id="formFooter">
                        <a class="underlineHover" href="/">Main Page</a>
                    </div>
                </div>
            </div>



        );
    }
}
export default Register;