import React from "react";
import {ListItem, ListItemText, Typography, Link, Button, makeStyles, Paper, Box} from "@material-ui/core";
import {langDe} from "package";
import {ThumbUp} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    website: {
        display: "flex",
        flexDirection: "column",
        margin: theme.spacing(1)
    },
    title: {
        margin: theme.spacing(2)
    },
    paper: {
        margin: theme.spacing(1),
        padding: "5%",
        minWidth: "40%"
    },
    text: {
        marginLeft: theme.spacing(1)
    },
    link: {
        display: "flex",
        justifyContent: "center"
    },
    box: {
        display: "flex",
        flexDirection: "row"
    }
}));


export const Website = (props) => {
    const classes = useStyles();

    const showTitle = () => {
        if (props.url.substring(0, 8) === "https://") {
            if (props.url.length > 48) {
                return `${props.url.substring(8, 45)}...`;
            } else {
                return props.url.substring(8, props.url.length);
            }
        } else if (props.url.substring(0, 7) === "http://") {
            if (props.url.length > 47) {
                return `${props.url.substring(7, 45)}...`;
            } else {
                return props.url.substring(7, props.url.length);
            }
        }
    };

    return (
        <ListItem button className={classes.website}>
            <Paper className={classes.paper}>
                <Typography variant="h5">{showTitle()}</Typography>
                <br/>
                <Box className={classes.box}>
                    <ThumbUp/>
                    <ListItemText className={classes.text}>{props.comments}</ListItemText>
                </Box>
                <Link color="inherit" href={props.url} className={classes.link}>
                    <Button color="primary" variant="contained">{langDe.toWebsite}</Button>
                </Link>
            </Paper>
        </ListItem>
    );
};

export default Website;