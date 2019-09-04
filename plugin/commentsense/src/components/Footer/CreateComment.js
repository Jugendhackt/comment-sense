/*global chrome */
import React, { useState, useEffect } from "react";
import bootbox from "bootbox";

import ipAdress from "../../ipAdress";

function CreateComment(props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        chrome.storage.local.get(["username", "password"], result => {
            if (typeof result.username != "undefined" && typeof result.password != "undefined") {
                setUsername(result.username);
                setPassword(result.password);
            }
        });
    }, []);

    function sendComment() {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, tabs => {
            let url = tabs[0].url;
            fetch(`${ipAdress}/comments/`, {
                method: "POST",
                body: JSON.stringify({
                    userName: username,
                    password: password,
                    url: url,
                    headline: title,
                    content: content
                })
            })
            .then(res => res.json())
            .then(res => {
                if (res.status === "comment successfully posted") {
                    bootbox.alert(props.lang.createCommentSuccess);
                }
            })
            .catch(e => {
                bootbox.alert(props.lang.createCommentFail);
            })
        });
    }

    return (
        <div className={"navbar-dark bg-dark p-2 border border-primary"}>
            <div className={"w-100 d-flex flex-column justify-content-center align-items-center"}>
                <h2>{props.lang.yourComment}</h2>
                <small className={"text-muted"}></small>
            </div>
            <div className={"container-fluid"}>
                <div className="form-group">
                    <label>{props.lang.title}</label>
                    <input className="form-control" placeholder={props.lang.titleOfComment} value={title} onChange={evt => setTitle(evt.target.value)} />
                </div>
                <div className="form-group">
                    <label>{props.lang.content}</label>
                    <textarea className="form-control" placeholder={props.lang.contentOfComment} value={content} onChange={evt => setContent(evt.target.value)} rows="8" cols="30"></textarea>
                </div>
                <div className="w-100 d-flex justify-content-center">
                    <button className="btn btn-primary" onClick={sendComment}>{props.lang.sendComment}</button>
                </div>
            </div>
        </div>
    );
}

export default CreateComment;