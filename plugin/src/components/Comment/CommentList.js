/*global chrome*/

import React, { useState, useEffect } from "react";
import bootbox from "bootbox";

import Comment from "./Comment";

function Comments() {
    const [comments, setComments] = useState([]);

    function getUrl() {
        return new Promise((resolve) => {
            chrome.tabs.query({
                active: true,
                currentWindow: true,
            }, tabs => {
                console.log(tabs[0]);
                resolve(tabs[0]);
            });
        });
    }

    useEffect(() => {
        getUrl().then(tab => {
            fetch("http://192.168.2.105/comments/site='" + tab.url + "'")
                .then(res => res.json())
                .then(res => {
                    setComments(res.comments);
                })
                .catch(() => bootbox.alert("Server ist down"))
        });
    }, []);

    function createComments() {
        return comments.map(item => {
            return (<Comment headline={item.headline} username={item.userName} votes={item.votes} date={item.date} content={item.content} key={item.id} />)
        });
    }

    return (
        <>
            {createComments()}
        </>
    )

}

export default Comments;