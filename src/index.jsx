import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom"
import LoginController from './controllers/login.controller';

ReactDOM.render(
  <React.StrictMode>
      <Router>
        <LoginController> 
          <App />
        </LoginController>  
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

