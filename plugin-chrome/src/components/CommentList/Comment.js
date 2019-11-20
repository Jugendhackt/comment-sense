import React from "react";
import { ListItem, Paper, makeStyles, Typography, ListItemText, Box } from "@material-ui/core";
import { ThumbUp } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    comment: {
        display: "flex",
        flexDirection: "column",
        margin: theme.spacing(1)
    },
    paper: {
        margin: theme.spacing(2),
        padding: "5%",
        minWidth: "40%"
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

    return (
        <ListItem button className={classes.comment}>
            <Paper className={classes.paper}>
                <Box className={`${classes.box} ${classes.mb}`}>
                    <Typography variant="h5">{props.title}</Typography>
                    <Typography variant="caption">{props.date}</Typography>
                </Box>
                <ListItemText primary={props.content} className={classes.mb} />
                <Box className={classes.box}>
                    <Typography variant="caption">{props.author}</Typography>
                    <Box display="flex">
                        <ThumbUp color="secondary" />
                        <ListItemText primary={props.votes} className={classes.text} />
                    </Box>
                </Box>
            </Paper>
        </ListItem>
    );
};

export { Comment };