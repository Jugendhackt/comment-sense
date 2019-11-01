import React, { useState } from "react";
import { MenuItem, ListItemIcon, ListItemText, Menu, Link } from "@material-ui/core";
import { Person, PersonAdd, SettingsApplications } from "@material-ui/icons";
import { langDe } from "../../constants";
import { SignIn } from "../Dialogs/SignIn";
import { SignUp } from "../Dialogs/SignUp";

function AccountDropDown(props) {

    const [openSignIn, setOpenSignIn] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);

    return (
        <>
            <Menu keepMounted anchorEl={props.anchorEl} open={props.open} onClose={props.onClose}>
                <MenuItem onClick={() => setOpenSignIn(true)}>
                    <ListItemIcon><Person color="secondary" /></ListItemIcon>
                    <ListItemText primary={langDe.signIn} />
                </MenuItem>
                <MenuItem onClick={() => setOpenSignUp(true)}>
                    <ListItemIcon><PersonAdd color="secondary" /></ListItemIcon>
                    <ListItemText primary={langDe.signUp} />
                </MenuItem>
                <Link color="inherit" href="/account/">
                    <MenuItem>
                        <ListItemIcon><SettingsApplications color="secondary" /></ListItemIcon>
                        <ListItemText primary={langDe.account} />
                    </MenuItem>
                </Link>
            </Menu>
            <SignIn open={openSignIn} onClose={() => setOpenSignIn(false)} />
            <SignUp open={openSignUp} onClose={() => setOpenSignUp(false)} />
        </>
    );
};

export { AccountDropDown };