import React from "react";
import {makeStyles, Paper, Typography} from "@material-ui/core";
import {langDe} from "package/util/lang";

const useStyles = makeStyles(() => ({
    center: {
        display: "flex",
        justifyContent: "center"
    },
    paper: {
        padding: "2%"
    }
}));

export const NotFound = () => {
    const classes = useStyles();
    return (
        <div className={classes.center}>
            <Paper className={classes.paper}>
                <Typography variant="h4">{langDe.notFoundTitle}</Typography>
                <Typography variant="body1">{langDe.notFoundText}</Typography>
            </Paper>
        </div>
    );
};

export default NotFound;