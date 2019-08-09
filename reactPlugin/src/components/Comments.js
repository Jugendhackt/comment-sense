/*global chrome*/

import React, { useState, useEffect } from "react";

import Comment from "./Comment";

function Comments(props) {
    const [comments, setComments] = useState([]);

    const ipAdress = "192.168.2.105";

    function getUrl() {
        return new Promise(resolve => {
            chrome.tabs.query({
                currentWindow: true,
                active: true
            }, result => {
                console.log(result);
                resolve(result[0].url);
            });
        });
    }

    useEffect(() => {
        getUrl().then(url => {
            fetch(ipAdress + "/comments/site='" + url + "'")
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setComments(data);
                });
        });
    }, []);

    function createComments() {
        return comments.map(element => {
            return <Comment comment={element.content} username={element.userName} id={element.id} title={element.headline} votes={element.votes} date={element.date} />
        });
    }

    return (
        <div className="list-group">
            {createComments()}
        </div>
    )
}

export default Comments;