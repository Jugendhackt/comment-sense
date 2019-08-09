import React, {useState, useEffect} from "react";
import bootbox from "bootbox";

import Comment from "./Comment";

function Comments() {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch("http://192.168.2.105/comments/site='https://www.google.de/'")
            .then(res => res.json())
            .then(res => {
                setComments(res.comments);
            })
            .catch(() => bootbox.alert("Server ist down"))
    }, []);

    function createComments() {
        console.log(comments);
        return comments.map(item => {
            return (<Comment headline={item.headline} username={item.userName} votes={item.votes} date={item.date} content={item.content} key={item.id}/>)
        });
    }

    return (
        <>
        {createComments()}
        </>
    )

}

export default Comments;