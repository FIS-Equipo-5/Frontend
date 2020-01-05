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
    
  

            <form onSubmit={this.handleSubmit}>
                <div class="box">
                <h1>Login</h1>
               
                    <div>
                    <label for="email">Enter your email</label>
                    <input id="email" name="email" type="email" class="email"/>
                    </div>

                    <div>
                    <label for="password">Enter your password</label>
                    <input id="password" name="password" type="password" class="password"/>
                    </div>

                    <div class="btn"><button>Login</button></div>
                    </div>
            </form>



        );
    }
}
export default Authenticate;