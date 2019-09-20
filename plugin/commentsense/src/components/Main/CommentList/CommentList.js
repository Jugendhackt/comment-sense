/*global chrome */
import React, {useState, useEffect} from "react";
import {withRouter} from "react-router-dom";

import ipAddress from "../../../ipAddress";
import Comment from "./Comment";

function CommentList(props) {
    const [comments, setComments] = useState([]);

    function getUrl() {
        return new Promise(resolve => {
            chrome.tabs.query({
                currentWindow: true,
                active: true
            }, result => {
                resolve(result[0].url)
            });
        });
    }

    useEffect(() => {
        getUrl()
            .then(url => {
                let str;
                if (props.loggedIn)
                    str = `${ipAddress}/comments/site='${url}',name='${props.username}'`;
                else
                    str = `${ipAddress}/comments/site='${url}'`;
                fetch(str)
                    .then(res => res.json())
                    .then(res => {
                        setComments(res.comments);
                    })
                    .catch(e => {
                        props.history.push("/error/");
                    });
            });
    }, []);

    function showComments() {
        return comments.map(item => {
            return <Comment title={item.headline} date={item.date} content={item.content} creator={item.userName}
                            username={props.username} password={props.password} votes={item.votes} voted={item.voted}
                            id={item.id} lang={props.lang}/>
        });
    }

    return (
        <>
            {showComments()}
        </>
    );
}

export default withRouter(CommentList);