import React, { useState } from "react";
import { SwipeableDrawer, makeStyles, ListItem, Typography, List, Divider, Link, ListItemText, ListItemIcon } from "@material-ui/core";
import { langDe } from "../../constants";
import { Home, Person, PersonAdd } from "@material-ui/icons";

import { SignUp } from "../Dialogs/SignUp/index";
import { SignIn } from "../Dialogs/SignIn/index";

const useStyles = makeStyles(theme => ({
    list: {
        width: 250
    }
}));

function Drawer(props) {
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);

    const classes = useStyles();

    return (
        <SwipeableDrawer open={props.open} onClose={props.onClose} onOpen={props.onClose}>
            <div className={classes.list}>
                <List>
                    <ListItem>
                        <Typography variant="h6">{langDe.brandName}</Typography>
                    </ListItem>
                    <Divider />
                    <Link color="inherit" href="/">
                        <ListItem button>
                            <ListItemIcon><Home color="secondary" /></ListItemIcon>
                            <ListItemText primary={langDe.home} />
                        </ListItem>
                    </Link>
                    <ListItem button onClick={() => setOpenSignIn(true)} >
                        <ListItemIcon><Person color="secondary" /></ListItemIcon>
                        <ListItemText primary={langDe.signIn} />
                    </ListItem>
                    <ListItem button onClick={() => setOpenSignUp(true)} >
                        <ListItemIcon><PersonAdd color="secondary" /></ListItemIcon>
                        <ListItemText primary={langDe.signUp} />
                    </ListItem>
                </List>
            </div>
            <SignUp open={openSignUp} onClose={() => setOpenSignUp(false)} />
            <SignIn open={openSignIn} onClose={() => setOpenSignIn(false)} />
        </SwipeableDrawer>
    );
};

export { Drawer };