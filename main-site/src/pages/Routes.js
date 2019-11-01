import React from "react";
import { Route } from "react-router-dom";
import { Home } from "./Home";
import { Account } from "./Account";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    mt: {
        marginTop: theme.spacing(2)
    }
}));

function Routes(props) {
    const classes = useStyles();

    return (
        <Container fixed className={classes.mt}>
            <Route exact path="/" render={(para) => <Home {...para} />} />
            <Route exact path="/account/" render={(para) => <Account {...para} />} />
        </Container>
    );
};

export { Routes as Pages };