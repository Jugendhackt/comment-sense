import React from "react";
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
    const classes = useStyles();

    const {userStore} = useStores();

    const sendVote = () => {
        fetch(voteCommentRoute(), {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sid: userStore.sid,
                username: userStore.username,
                id: props.id,
                vote: 1
            })
        }).then(res => {
            if (res.status === 200) {

            } else if (res.status === 400) {

            }
        })
    };

    let color;
    if (props.voted) {
        color = "secondary";
    } else {
        color = "";
    }

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
                        <ThumbUp color={color}/>
                        <ListItemText primary={props.votes} className={classes.text}/>
                    </Box>
                </Box>
            </Paper>
        </ListItem>
    );
};

export default Comment;