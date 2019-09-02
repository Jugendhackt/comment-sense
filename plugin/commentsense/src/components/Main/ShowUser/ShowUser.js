/*global chrome*/
import React, { useState, useEffect } from "react";
import bootbox from "bootbox";

import Login from "./Login";
import LoggedIn from "./LoggedIn";

function ShowUser(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        chrome.storage.local.get(["username", "password"], result => {
            setUsername(result.username);
            setPassword(result.password);
            console.log(result.username, result.password);
            if (typeof result.username !== "undefined" && typeof result.password !== "undefined") {
                fetch(`${props.ipAdress}/users/login/`, {
                    method: "POST",
                    body: JSON.stringify({
                        userName: result.username,
                        password: result.password,
                    })
                })
                    .then(res => res.json())
                    .then(res => {
                        console.log(res);
                        if (res.status === "login data valid") {
                            setLoggedIn(true);
                        } else {
                            bootbox.alert(props.lang.loginDataNotFound);
                        }
                    })
                    .catch(e => {
                        bootbox.alert(props.lang.serverNotReachable);
                    });
            }
        });
    }, []);

    function showLogin() {
        if (loggedIn === false) {
            return (
                <>
                    <Login lang={props.lang}/>
                </>
            );
        } else if (loggedIn === true) {
            return (
                <>
                    <LoggedIn lang={props.lang}/>
                </>
            );
        }
    }

    return (
        <>
            {showLogin()}
        </>
    );

}

export default ShowUser;