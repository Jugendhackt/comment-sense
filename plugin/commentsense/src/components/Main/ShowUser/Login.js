/* global chrome */
import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import bootbox from "bootbox";

import ipAddress from "../../../ipAddress";

function Login(props) {
    const [username, setUsername] = useState(props.username);
    const [password, setPassword] = useState(props.password);

    function saveData() {
        if (username && password) {
            fetch(`${ipAddress}/users/login/`, {
                method: "POST",
                body: JSON.stringify({
                    userName: username,
                    password: password
                })
            })
                .then(res => res.json())
                .then(res => {
                    if (res.status === "login data valid") {
                        chrome.storage.local.set({username: username, password: password});
                        bootbox.alert(props.lang.loginSuccess, () => {
                            chrome.runtime.reload();
                        });
                    } else {
                        bootbox.alert(props.lang.loginDataNotFound);
                    }
                })
                .catch(e => {
                    props.history.push("/error/");
                });
        }
    }

    return (
        <>
            <small className="text-muted">{props.lang.fillAllFields}</small>
            <div className="form-group">
                <label>{`${props.lang.username}:`}</label>
                <input className="form-control" value={username} onChange={evt => setUsername(evt.target.value)}
                       placeholder={props.lang.yourUsername}/>
            </div>
            <div className="form-group">
                <label>{`${props.lang.password}:`}</label>
                <input className="form-control" value={password} onChange={evt => setPassword(evt.target.value)}
                       type="password" placeholder={props.lang.yourPassword}/>
            </div>
            <div className="w-100 d-flex justify-content-center">
                <button className="btn btn-primary m-2" onClick={saveData}>{props.lang.login}</button>
            </div>
        </>
    );
}

export default withRouter(Login);