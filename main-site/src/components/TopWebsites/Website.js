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
        padding: "5%",
        minWidth: "40%"
    },
    text: {
        marginLeft: theme.spacing(1)
    }
}));


const Website = (props) => {
    const classes = useStyles();
    const para = props;

    
    const showTitle = () => {
        if (props.url.length > 40) {
            return props.url.substring(0, 40) + "...";
        }
        return props.url;
    }; 


    return (
        <ListItem button className={classes.website} >
            <Paper className={classes.paper}>
                <Typography variant="h5">{showTitle}</Typography>
                <br />
                <Box display="flex">
                    <ThumbUp color="secondary" />
                    <ListItemText primary={props.comments} className={classes.text} />
                </Box>
                <Link color="inherit" href={props.url}>
                    <Button color="primary" variant="contained">{langDe.toWebsite}</Button>
                </Link>
            </Paper>
        </ListItem>
    );
};

export { Website }