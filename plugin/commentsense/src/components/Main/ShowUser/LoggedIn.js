import React from "react";

function LoggedIn(props) {

    return (
        <>
            <p>{props.lang.alreadyLoggedIn}</p>
            <button className="btn btn-primary" onClick={props.logout}>{props.lang.logout}</button>
        </>
    );
}

export default LoggedIn;