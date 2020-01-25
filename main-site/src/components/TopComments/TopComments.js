import React, {useEffect} from "react";
import uuid from "uuid";
import {observer} from "mobx-react-lite";
import {Box, CircularProgress, List, makeStyles} from "@material-ui/core";
import {useStores} from "package/util/hooks";
import {Routes} from "package/util/routes";
import {Comment} from "package/components";

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

const TopComments = observer(() => {
    const classes = useStyles();
    const {commentStore, userStore} = useStores();

    useEffect(() => {
        fetch(Routes.topComments({count: 7}))
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
            })
            .then(res => {
                commentStore.comments = res.comments;
            })
    }, []);

    const showComments = () => {
        if (Array.isArray(commentStore.comments) && commentStore.comments.length) {
            return commentStore.comments.map(item => {
                const {date, content, headline, url, author, likes} = item;
                return <Comment date={date} content={content} title={headline} url={url}
                                author={author} votes={likes} key={uuid.v4()}/>
            });
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

export default TopComments;