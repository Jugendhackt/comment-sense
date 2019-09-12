/*global chrome */
import React, { useState, useEffect } from "react";
import {withRouter} from "react-router-dom";

import ipAdress from "../../../ipAdress";
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
        getUrl().then(url => {
            fetch(`${ipAdress}/comments/site='${url}'`)
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    setComments(res.comments);
                })
                .catch(e => {
                    props.history.push("/error/");
                });
        });
    }, []);

    function showComments() {
        return comments.map(item => {
            return <Comment title={item.headline} date={item.date} content={item.content} username={item.userName} votes={item.votes} />
        });
    }

    return (
        <>
            {showComments()}
        </>
    );
}

export default CommentList;