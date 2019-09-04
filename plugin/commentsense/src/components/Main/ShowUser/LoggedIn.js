/*global chrome */
import React from "react";
import bootbox from "bootbox";

function LoggedIn(props) {

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
            <p>{props.lang.alreadyLoggedIn}{props.username}</p>
            <button className="btn btn-primary m-2" onClick={logout}>{props.lang.logout}</button>
        </>
    );
}

export default LoggedIn;