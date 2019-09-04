/*global chrome */
import React, { useState, useEffect } from "react";
import bootbox from "bootbox";

function LoggedIn(props) {
    const [username, setUsername] = useState("");

    useEffect(() => {
        chrome.storage.local.get("username", result => {
            if (typeof result.username != "undefined") {
                setUsername(result.username);
            }
        });
    }, []);

    function logout() {
        bootbox.confirm(props.lang.confirmLogout, result => {
            if (result) {
                chrome.storage.local.remove(["username", "password"]);
                chrome.runtime.reload();
            }
        });
    }

    return (
        <>
            <p>{props.lang.alreadyLoggedIn}{username}</p>
            <button className="btn btn-primary m-2" onClick={logout}>{props.lang.logout}</button>
        </>
    );
}

export default LoggedIn;