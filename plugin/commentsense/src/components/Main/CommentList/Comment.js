import React from "react";

import like from "../../../assets/icons/like.png";
import unlike from "../../../assets/icons/unlike.png";

function Comment(props) {

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
                <small className={"text.muted"}>{props.username}</small>
                <div>
                    <img src={like}/>
                    <span>{props.votes}</span>
                </div>
            </div>
        </div>
    );
}

export default Comment;