import React, {useEffect} from "react";
import uuid from "uuid";
import {observer} from "mobx-react-lite";
import {Box, CircularProgress, List, makeStyles} from "@material-ui/core";
import {Comment, useStores, topCommentsRoute} from "package";

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

export const TopComments = observer((props) => {
    const classes = useStyles();

    const {commentStore} = useStores();

    useEffect(() => {
        fetch(topCommentsRoute(5))
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
            })
            .then(res => {
                commentStore.handleComments(res.comments);
            })
    }, []);

    const showComments = () => {
        if (Array.isArray(commentStore.comments) && commentStore.comments.length) {
            return commentStore.comments.map(item => {
                return <Comment date={item.date} content={item.content} title={item.headline} url={item.url}
                                author={item.author} votes={item.likes} key={uuid.v4()}/>
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