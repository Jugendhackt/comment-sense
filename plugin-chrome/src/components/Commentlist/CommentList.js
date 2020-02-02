import React, {useEffect, useState} from "react";
import uuid from "uuid";
import {observer} from "mobx-react-lite";
import {Box, CircularProgress, List, makeStyles} from "@material-ui/core";
import {useCurrentTab, useStores} from "package/util/hooks";
import {Comment} from "package/components";
import {standardComment} from "package/util/constants";
import {Routes} from "package/util/routes";

const useStyles = makeStyles(() => ({
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

const CommentList = observer(() => {
    const [url, setUrl] = useState("");
    const {commentStore, userStore} = useStores();
    const classes = useStyles();

    useEffect(() => {
        useCurrentTab().then(url => {
            const getData = () => {
                fetch(Routes.getComments(url, userStore.username))
                    .then(res => {
                        if (res.ok)
                            return res.json();
                    })
                    .then(res => {
                        commentStore.comments = res.comments;
                    })
            };

            const interval = setInterval(getData, 30000);
            getData();
            return () => clearInterval(interval);
        });
    }, []);

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