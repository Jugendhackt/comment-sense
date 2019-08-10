/*global chrome*/
import React, {useState} from "react";


import like from "../assets/icons/like.png";
import unlike from "../assets/icons/unlike.png";

function Comment(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function getUserData() {
        return new Promise(resolve => {
            chrome.storage.local.get(["username", "password"], result => {
                if (typeof result != "undefined")
                    resolve(result);
            });
        });
    }

    getUserData.then(result => {
        setUsername(result.username);
        setPassword(result.password);
    });

    return (
        <a className="list-group-item list-group-item-action mb-4 border border-primary" id={props.id}>
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{props.title}</h5>
                <small className="text-muted">{props.date}</small>
            </div>
            <p className="mb-1">{props.comment}</p>
            <div className="d-flex w-100 justify-content-between">
                <small className="text-muted">{props.username}</small>
                <div>
                    <img src={(props.username === username) ? unlike : like} />
                    <span>{props.votes}</span>
                </div>
            </div>
        </a>
    )

}

export default Comment;