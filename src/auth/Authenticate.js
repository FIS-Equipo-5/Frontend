import React from 'react';
import AuthApi from './AuthApi.js';
import Alert from '.././Alert.js';
import './auth.css';

class Authenticate extends React.Component {
    constructor() {
        super();
        this.state = {
            errorInfo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        AuthApi.authenticate(data.get('email'), data.get('password')).then((response) => {
            console.log(response.status);
            if (response.status != "200") {
                this.setState({
                    errorInfo: "Incorrect email/password"
                });
            } else {
                window.location.href = '/';
            }
        });


    }

    handleCloseError(){
        this.setState({
            errorInfo: null,
            success: null
        });
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
                            <Alert message={this.state.errorInfo} onClose={this.handleCloseError}/>
                        </div>
                        <input type="text" id="email" class="fadeIn second" name="email" placeholder="email" />
                        <input type="password" id="password" class="fadeIn third" name="login" placeholder="password" />
                        <input type="submit" class="fadeIn fourth" value="Log In" />
                    </form>

                    <div id="formFooter">
                        <a class="underlineHover" href="/register">Sign up now!</a>
                    </div>
                </div>
            </div>

        );
    }
}
export default Authenticate;