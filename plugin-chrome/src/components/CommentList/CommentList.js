import React, {useEffect, useContext} from "react";
import uuid from "uuid";
import {observer} from "mobx-react-lite";
import {List, makeStyles, CircularProgress, Box} from "@material-ui/core";
import Comment from "./Comment";
import {ipAddress} from "../../constants";
import {CommentStoreContext} from "../../stores/CommentStore";
import {getCurrentTab} from "../../helpers";

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

const CommentList = observer((props) => {
    const commentStore = useContext(CommentStoreContext);

    const classes = useStyles();

    useEffect(() => {
        getCurrentTab().then(url => {
            console.log(url);
            fetch(`${ipAddress}/api/comments?site=%27${url}%27`)
                .then(res => {
                    if (res.ok)
                        return res.json();
                })
                .then(res => {
                    console.log(res);
                    commentStore.comments = res.comments;
                })
        })
    }, []);

    function showComments() {
        if (Array.isArray(commentStore.comments) && commentStore.comments.length) {
            return commentStore.comments.map(item => {
                return <Comment date={item.date} content={item.content} title={item.headline} url={item.url}
                                author={item.author} votes={item.likes} key={uuid.v4()}/>
            });
        } else if (Array.isArray(commentStore.comments) && !commentStore.comments.length) {
                return <Comment date="1.1.1970" content="Keine Kommentare vorhanden" title="Kein Kommentar"
                                author="CommentSense" votes="1" key={uuid.v4()}/>
        } else {
            return (
                <Box className={classes.box}>
                    <CircularProgress size={100} className={classes.progress}/>
                    <CircularProgress size={100} className={classes.progress}/>
                    <CircularProgress size={100} className={classes.progress}/>
                    <CircularProgress size={100} className={classes.progress}/>
                    <CircularProgress size={100} className={classes.progress}/>
                </Box>
            );
        }

    }

    return (
        <List>
            {showComments()}
        </List>
    );
});

export default CommentList;