/*global chrome */
import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import bootbox from "bootbox";

import ipAddress from "../../ipAddress";

function CreateComment(props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    function sendComment() {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, tabs => {
            let url = tabs[0].url;
            fetch(`${ipAddress}/comments/`, {
                method: "POST",
                body: JSON.stringify({
                    userName: props.username,
                    password: props.password,
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
                    props.history.push("/error/");
                });
        });
    }

    return (
        <div className={"navbar-dark bg-dark p-2 border border-primary"}>
            <div className={"w-100 d-flex flex-column justify-content-center align-items-center"}>
                <h2>{props.lang.yourComment}</h2>
                <small className={"text-muted"}>{props.lang.fillAllFields}</small>
            </div>
            <div className={"container-fluid"}>
                <div className="form-group">
                    <label>{props.lang.title}</label>
                    <input className="form-control" placeholder={props.lang.titleOfComment} value={title}
                           onChange={evt => setTitle(evt.target.value)}/>
                </div>
                <div className="form-group">
                    <label>{props.lang.content}</label>
                    <textarea className="form-control" placeholder={props.lang.contentOfComment} value={content}
                              onChange={evt => setContent(evt.target.value)} rows="8" cols="30" />
                </div>
                <div className="w-100 d-flex justify-content-center">
                    <button className="btn btn-primary" onClick={sendComment}>{props.lang.sendComment}</button>
                </div>
            </div>
        </div>
    );
}

export default withRouter(CreateComment);