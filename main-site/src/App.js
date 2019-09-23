import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import Header from "./components/Header/Header";

import langDe from "./lang/langDe";
import Main from "./components/Main/Main";

const lang = navigator.language;

function getLanguage() {
    switch (lang) {
        case "de-DE":
        case "DE-de":
        case "de":
            return langDe;

        default:
            return langDe;
    }
}

function App() {
    return (
        <Router>
            <Header lang={getLanguage()}/>
            <Main lang={getLanguage()}/>
        </Router>
    );
}

export default App;
