import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import ReactDOM from 'react-dom';
import App from './App';

import "./style/style.css";
import "bootstrap";
import "./style/theme.css";

ReactDOM.render(
    <Router>
        <App/>
    </Router>
    , document.getElementById('root'));
