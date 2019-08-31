/*global chrome*/
import React, { useState, useEffect } from "react";
import bootbox from "bootbox";

import Login from "./Login";
import LoggedIn from "./LoggedIn";

function ShowUser(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
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
                            setLoading(false);
                            setLoggedIn(true);
                        } else {
                            setLoading(false);
                        }
                    })
                    .catch(e => {
                        setLoading(false);
                        bootbox.alert(props.lang.serverNotReachable);
                    });
            }
        });
    }, []);

    function saveData() {
        console.log("hi3", username, password);
        if (typeof username != "undefined" && typeof password != "undefined") {
            chrome.storage.local.set({ "username": username, "password": password });
            bootbox.alert(props.lang.saveSuccess);
        } else {
            bootbox.alert(props.lang.emptyInput);
        }
    }

    function showLogin() {
        if (loading === false && loggedIn === false) {
            return (
                <>
                    <Login lang={props.lang} username={username}
                        changeUsername={(evt) => setUsername(evt.target.value)} password={password}
                        changePassword={(evt) => setPassword(evt.target.value)} save={saveData} />
                </>
            );
        } else {
            return (
                <>
                    <LoggedIn lang={props.lang} logout={logout}/>
                </>
            );
        }
    }

    function logout() {
        console.log("Jio");
        chrome.storage.local.remove(["username", "password"]);
    }

    return (
        <>
            {showLogin()}
        </>
    );

}

export default ShowUser;