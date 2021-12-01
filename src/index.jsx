import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom"
import LoginController from './controllers/login.controller';
import UserController from './controllers/user.controller';

ReactDOM.render(
  <React.StrictMode>
      <Router>
        <UserController>
          <LoginController> 
            <App />
          </LoginController>  
        </UserController>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

