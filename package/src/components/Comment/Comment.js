import React from "react";
import {Box, ListItem, ListItemText, makeStyles, Paper, Typography} from "@material-ui/core";
import {ThumbUp} from "@material-ui/icons";
import {useStores} from "../../util/hooks";
import {Routes} from "../../util/routes";

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
    const {voted} = props;
    const classes = useStyles();

    const sendVote = () => {
        console.log(userStore.sid);
        fetch(Routes.voteComment(), {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sid: userStore.sid,
                username: userStore.username,
                id: props.id,
                vote: !voted,
                password: "test"
            })
        }).then(res => {
            console.log(res);
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
                        <ThumbUp color={(voted) ? "primary" : "inherit"}/>
                        <ListItemText primary={props.votes} className={classes.text}/>
                    </Box>
                </Box>
            </Paper>
        </ListItem>
    );
};

export default Comment;