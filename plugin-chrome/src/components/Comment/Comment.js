import React, {useState} from "react";
import {Box, ListItem, ListItemText, makeStyles, Paper, Typography} from "@material-ui/core";
import {ThumbUp} from "@material-ui/icons";
import {useStores} from "../../util/hooks";
import {voteCommentRoute} from "../../util/routes";

const useStyles = makeStyles(theme => ({
    comment: {
        display: "flex",
        flexDirection: "column"
    },
    paper: {
        margin: theme.spacing(2),
        padding: "5%",
        minWidth: "70%"
    },
    box: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    mb: {
        marginBottom: theme.spacing(2)
    },
    text: {
        marginLeft: theme.spacing(1)
    }
}));


const Comment = (props) => {
    const {userStore} = useStores();

    const classes = useStyles();


    const sendVote = () => {
        console.log(userStore.sid);
        fetch(voteCommentRoute(), {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sid: userStore.sid,
                username: userStore.username,
                id: props.id,
                vote: !props.voted,
                password: "q"
            })
        }).then(res => {
            if (res.status === 200) {

            } else if (res.status === 400) {

            }
        })
    };



    return (
        <ListItem button className={classes.comment}>
            <Paper className={classes.paper}>
                <Box className={`${classes.box} ${classes.mb}`}>
                    <Typography variant="h5">{props.title}</Typography>
                    <Typography variant="caption">{props.date}</Typography>
                </Box>
                <ListItemText primary={props.content} className={classes.mb}/>
                <Box className={classes.box}>
                    <Typography variant="caption">{props.author}</Typography>
                    <Box display="flex" onClick={sendVote}>
                        <ThumbUp color={(props.voted) ? "primary" : "inherit"}/>
                        <ListItemText primary={props.votes} className={classes.text}/>
                    </Box>
                </Box>
            </Paper>
        </ListItem>
    );
};

export default Comment;