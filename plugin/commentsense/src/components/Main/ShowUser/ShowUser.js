import React from "react";

import Login from "./Login";
import LoggedIn from "./LoggedIn";

function ShowUser(props) {

    function showLogin() {
        if (props.loggedIn) {
            return (
                <LoggedIn lang={props.lang} username={props.username}/>
            );
        } else {
            return (
                <Login lang={props.lang} username={props.username} password={props.password}/>
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