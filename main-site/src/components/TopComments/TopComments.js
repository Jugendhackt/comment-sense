import React, { useState, useEffect } from "react";
import uuid from "uuid";
import { List, makeStyles, CircularProgress, Box } from "@material-ui/core";
import { Comment } from "./Comment";
import { ipAddress } from "../../constants";

const useStyles = makeStyles(theme => ({
    box: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    progress: {
        margin: "5%"
    }
}));

function TopComments(props) {
    const classes = useStyles();

    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`${ipAddress}/api/comments?count='5'`)
            .then(res => {
                if (res.ok)
                    return res.json();
            })
            .then(res => {
                setComments(res.comments);
            })
    }, []);

    function showComments() {
        if (Array.isArray(comments) && comments.length) {
            return comments.map(item => {
                return <Comment date={item.date} content={item.content} title={item.headline} url={item.url} author={item.author} votes={item.likes} key={uuid.v4()} />
            });
        } else {
            return (
                <Box className={classes.box}>
                    <CircularProgress size={100} className={classes.progress} />
                    <CircularProgress size={100} className={classes.progress} />
                    <CircularProgress size={100} className={classes.progress} />
                    <CircularProgress size={100} className={classes.progress} />
                    <CircularProgress size={100} className={classes.progress} />
                </Box>
            );
        }
        
    };

    return (
        <List>
            {showComments()}
        </List>
    );
};

export { TopComments };