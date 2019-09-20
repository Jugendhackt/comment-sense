/*global chrome*/
import React, {useState, useEffect} from 'react';
import {withRouter} from "react-router-dom";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

import ipAddress from "./ipAddress";
import langDe from "./lang/langDe";

function App(props) {
    const [username, setUsername] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    const lang = navigator.language;

    useEffect(() => {
        chrome.storage.local.get(["username", "password"], result => {
            if (result.username && result.password) {
                fetch(`${ipAddress}/users/login/`, {
                    method: "POST",
                    body: JSON.stringify({
                        userName: result.username,
                        password: result.password
                    })
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.status === "login data valid") {
                            setUsername(result.username);
                            setPassword(result.password);
                            setLoggedIn(true);
                            setLoading(false);
                        } else {
                            setLoading(false);
                            setLoggedIn(false);
                        }
                    })
                    .catch(e => {
                        props.history.push("/error/");
                    })
            } else {
                setLoggedIn(false);
                setLoading(false);
            }
        });
    }, []);

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

    if (loading) {
        return (
            <div className="w-100 h-100 d-flex justify-content-center align-items-center" style={{height: "150px"}}>
                <div className="spinner-border m-3" style={{width: "7.5em", height: "7.5em"}} role="status">
                    <span className="sr-only"/>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <Header lang={getLanguage()}/>
                <Main lang={getLanguage()} loggedIn={loggedIn} username={username} password={password}/>
                <Footer lang={getLanguage()} loggedIn={loggedIn} username={username} password={password}/>
            </>
        );
    }
}

export default withRouter(App);
