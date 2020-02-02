import React from "react";
import {Box, ListItem, ListItemText, makeStyles, Paper, Typography} from "@material-ui/core";
import {ThumbUp} from "@material-ui/icons";
import {useStores, useTopComments, useVote} from "../../util/hooks";
import {observer} from "mobx-react-lite";

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
    },
    date: {
        marginLeft: theme.spacing(2)
    }
}));


const Comment = observer((props) => {
    const {userStore, snackbarStore, commentStore} = useStores();
    const classes = useStyles();

    const sendVote = async () => {
        if (userStore.loggedIn) {
            const response = await useVote(userStore.sid, props.id, userStore.username, !props.voted);

            if (response) {
                snackbarStore.openVoteSuccess = true;
                commentStore.comments = await useTopComments(5,userStore.username);
            } else {
                snackbarStore.openVoteFail = true;
            }
        }
    };

    const showTime = () => {
        const date = new Date(props.date);
        const day = date.getDate();
        //month begins at zero
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    return (
        <ListItem button className={classes.comment}>
            <Paper className={classes.paper}>
                <Box className={`${classes.box} ${classes.mb}`}>
                    <Typography variant="h5">{props.headline}</Typography>
                    <Typography variant="caption" className={classes.date}>{showTime()}</Typography>
                </Box>
                <ListItemText primary={props.content} className={classes.mb}/>
                <Box className={classes.box}>
                    <Typography variant="caption">{props.author}</Typography>
                    <Box display="flex" onClick={sendVote}>
                        <ThumbUp color={(props.voted) ? "primary" : "inherit"}/>
                        <ListItemText primary={props.likes} className={classes.text}/>
                    </Box>
                </Box>
            </Paper>
        </ListItem>
    );
});

export default Comment;