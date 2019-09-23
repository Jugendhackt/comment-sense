import React from "react";

function ErrorPage(props) {

    return (
        <>
            <h2>{props.lang.error}</h2>
            <p>
                {props.lang.serverNotReachable}
            </p>
        </>
    );
}

export default ErrorPage;