import React from "react";
import { ListItem, ListItemText, Typography, Link, Button, makeStyles, Paper, Box } from "@material-ui/core";
import { langDe } from "../../constants";
import { ThumbUp } from "@material-ui/icons";

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
        padding: "5%"
    },
    text: {
        marginLeft: theme.spacing(1)
    }
}));


function Website(props) {
    const classes = useStyles();

    const showTitle = () => {
        if (props.url.length > 20) {
            return props.url.substring(0, 20) + "...";
        }
        return props.url;
    };


    return (
        <>
            <ListItem button className={classes.website} >
                <Paper className={classes.paper}>
                    <Typography variant="h5">{showTitle()}</Typography>
                    <br />
                    <Box display="flex">
                        <ThumbUp color="secondary" />
                        <ListItemText primary={props.count} className={classes.text} />
                    </Box>
                    <Link color="inherit" href={`http://${props.url}`}>
                        <Button color="primary" variant="contained">{langDe.toWebsite}</Button>
                    </Link>
                </Paper>
            </ListItem>
        </>
    );
};

export { Website }