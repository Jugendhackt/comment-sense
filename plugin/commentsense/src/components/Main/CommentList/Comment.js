import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import uuid from "uuid";

import ipAddress from "../../../ipAddress";
import like from "../../../assets/icons/likeArrow.png";
import unlike from "../../../assets/icons/unlikeArrow.png";

function Comment(props) {

    const [vote, setVote] = useState(props.voted);
    const imgId = uuid.v4();
    const spanId = uuid.v4();

    function handleOnClick() {
        if (props.loggedIn) {
            let body;
            if (vote === 0) {
                body = 1;
            } else {
                body = -1;
            }
            fetch(`${ipAddress}/comments/vote/`, {
                method: "PATCH",
                body: JSON.stringify({
                    userName: props.username,
                    password: props.password,
                    id: props.id,
                    vote: body
                })
            })
                .then(res => res.json())
                .then(res => {
                    let i = parseInt(document.getElementById(spanId).textContent);
                    if (body === 1 && res.status === "successfully voted") {
                        document.getElementById(imgId).src = unlike;
                        document.getElementById(spanId).textContent = i + 1;
                        setVote(1);
                    } else if (body === -1 && res.status === "successfully unvoted") {
                        document.getElementById(imgId).src = like;
                        document.getElementById(spanId).textContent = i - 1;
                        setVote(0);
                    } else {
                        props.history.push("/error/");
                    }
                })
                .catch(e => {
                    props.history.push("/error/");
                });
        }
    }

    return (
        <div className={"list-group-item list-group-item-action mb-4 border border-primary"}>
            <div className={"d-flex w-100 justify-content-between"}>
                <h5 className={"mb-1"}>{props.title}</h5>
                <small className={"text-muted"}>{props.date}</small>
            </div>
            <p className={"mb-1"}>{props.content}</p>
            <div className={"d-flex w-100 justify-content-between"}>
                <small className={"text-muted"}>{props.creator}</small>
                <div style={(props.title === "Keine Kommentare") ? {display: "none"} : null}>
                    <span id={spanId}>{props.votes}</span>
                    <img src={(props.voted) ? unlike : like} onClick={handleOnClick} id={imgId}
                         alt={(props.voted) ? props.lang.unlike : props.lang.like}/>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Comment);