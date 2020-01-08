import React from 'react';
import AuthApi from './AuthApi.js';
import './auth.css';

class Register extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        AuthApi.register(data.get('name'), data.get('email'),data.get('password'));


    }

    render() {
        return (
    
  

            <form onSubmit={this.handleSubmit}>
                <div className="box">
                <h1>Register</h1>
               
                <div className="authBody">
                    <label htmlFor="name">Enter your name</label>
                    <input id="name" name="name" type="text" className="email"/>
                    </div>

                    <div className="authBody">
                    <label htmlFor="email">Enter your email</label>
                    <input id="email" name="email" type="email" className="email"/>
                    </div>

                    <div>
                    <label htmlFor="password">Enter your password</label>
                    <input id="password" name="password" type="password" className="password"/>
                    </div>

                    <div className="btn"><button>Register</button></div>
                    </div>
            </form>



        );
    }
}
export default Register;