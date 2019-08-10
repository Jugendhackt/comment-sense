/*global chrome*/

import React, { useState, useEffect } from "react";
import bootbox from "bootbox";

import Comment from "./Comment";

function Comments(props) {
    const [comments, setComments] = useState([]);

    const ipAdress = "http://192.168.2.105";

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
                })
                .catch(() => bootbox.alert("Server ist down"));
        });
    }, []);

    function createComments() {
        console.log(comments);
        console.log("39");
        let test = comments.comments;
        return test.map(element => {
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