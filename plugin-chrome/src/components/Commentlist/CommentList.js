import React, {useEffect} from "react";
import uuid from "uuid";
import {observer} from "mobx-react-lite";
import {List, makeStyles, CircularProgress, Box} from "@material-ui/core";
import {Comment} from "../Comment";
import {standardComment} from "../../util/constants";
import {getCurrentTab} from "../../util/helpers";
import {commentRoute} from "../../util/routes";
import {useStores} from "../../util/hooks";

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
    const {commentStore, userStore} = useStores();
    const classes = useStyles();


    getCurrentTab().then(url => {
        console.log(url, "url");
        fetch(commentRoute(url, userStore.username))
            .then(res => {
                if (res.ok)
                    return res.json();
            })
            .then(res => {
                commentStore.handleComments(res.comments);
            })
    })

    const showComments = () => {
        if (Array.isArray(commentStore.comments) && commentStore.comments.length) {
            return commentStore.comments.map(item => {
                return (
                    <Comment date={item.date} content={item.content} title={item.headline} url={item.url}
                             author={item.author} votes={item.likes} key={uuid.v4()} id={item.id} voted={item.voted}/>
                );
            });
        } else if (Array.isArray(commentStore.comments) && !commentStore.comments.length) {
            return (
                <Comment date={standardComment.date} content={standardComment.content} title={standardComment.title}
                         author={standardComment.author} votes={standardComment.votes}/>
            );
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

    };

    return (
        <List>
            {showComments()}
        </List>
    );
});

export default CommentList;