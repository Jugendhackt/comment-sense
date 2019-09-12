/*global chrome*/
import React from "react";

import Login from "./Login";
import LoggedIn from "./LoggedIn";

function ShowUser(props) {

    console.log(props.loggedIn);

    function showLogin() {
        if (props.loggedIn === false) {
            return (
                <Login lang={props.lang} username={props.username} password={props.password}/>
            );
        } else if (props.loggedIn) {
            return (
                <LoggedIn lang={props.lang} username={props.username}/>
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