import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Notfound from './notfound';
import Authenticate from '../src/auth/Authenticate';
import Register from '../src/auth/Register';
import AlreadyLoggedIn from '../src/auth/alreadyLoggedIn';

var isLoggedIn = localStorage.getItem('authToken') ? true : false;

const routing = (
    <Router>
        <Switch>
        <Route exact path="/" component={App} />
{ !isLoggedIn && <Route path="/login" component={Authenticate} /> }
{ isLoggedIn && <Route path="/login" component={AlreadyLoggedIn} /> }
        <Route path="/register" component={Register} />
        <Route component={Notfound} />
      </Switch>
    </Router>
  )
  ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
