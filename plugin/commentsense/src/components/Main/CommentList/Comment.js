import React, { useState } from "react";
import uuid from "uuid";

import ipAdress from "../../../ipAdress";
import like from "../../../assets/icons/like.png";
import unlike from "../../../assets/icons/unlike.png";

function Comment(props) {

    const [vote, setVote] = useState(props.voted);
    const [imgId, setImgId] = useState(uuid.v4());
    const [spanId, setSpanId] = useState(uuid.v4());

    function handleOnClick() {
        if (vote === 0) {
            console.log("hi");
            fetch(`${ipAdress}/comments/vote/`, {
                method: "PATCH",
                body: JSON.stringify({
                    userName: props.username,
                    password: props.password,
                    id: props.id,
                    vote: 1
                })
            })
                .then(res => res.json())
                .then(res => {
                    if (res.status === "successfully voted") {
                        document.getElementById(imgId).src = unlike;
                        document.getElementById(spanId).textContent = parseInt(document.getElementById(spanId).textContent) + 1;
                    }
                })
                .catch(e => console.log(e));
            setVote(1);
        } else if (vote === 1) {
            fetch(`${ipAdress}/comments/vote/`, {
                method: "PATCH",
                body: JSON.stringify({
                    userName: props.username,
                    password: props.password,
                    id: props.id,
                    vote: -1
                })
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === "successfully unvoted") {
                        document.getElementById(imgId).src = like;
                        document.getElementById(spanId).textContent = document.getElementById(spanId).textContent - 1;
                    }
                })
                .catch(e => console.log(e));
            setVote(0);
        }
    }

    return (
        <div className={"list-group-item list-group-item-action mb-4 border border-primary"}>
            <div className={"d-flex w-100 justify-content-between"}>
                <h5 className={"mb-1"}>{props.title}</h5>
                <small className={"text-muted"}>{props.date}</small>
            </div>
            <p className={"mb-1"}>
                {props.content}
            </p>
            <div className={"d-flex w-100 justify-content-between"}>
                <small className={"text-muted"}>{props.creator}</small>
                <div>
                    <img src={(props.voted) ? unlike : like} onClick={handleOnClick} id={imgId}  alt={"test"}/>
                    <span id={spanId}>{props.votes}</span>
                </div>
            </div>
        </div>
    );
}

export default Comment;