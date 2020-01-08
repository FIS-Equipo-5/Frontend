import React from 'react';
import AuthApi from './AuthApi.js';
import './auth.css';

class Authenticate extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        AuthApi.authenticate(data.get('email'), data.get('password'));


    }

    render() {
        return (

            <div class="wrapper fadeInDown">
                <div id="formContent">

                    <div class="fadeIn first">
                        <img src='https://image.freepik.com/vector-gratis/logotipo-futbol-american-logo-sports_1366-100.jpg' id="icon" alt="User Icon" />
                    </div>

                    <form onSubmit={this.handleSubmit}>
                        <input type="text" id="email" class="fadeIn second" name="email" placeholder="email" />
                        <input type="password" id="password" class="fadeIn third" name="login" placeholder="password" />
                        <input type="submit" class="fadeIn fourth" value="Log In" />
                    </form>

                    <div id="formFooter">
                        <a class="underlineHover" href="#">Sign up now!</a>
                    </div>
                </div>
            </div>

        );
    }
}
export default Authenticate;