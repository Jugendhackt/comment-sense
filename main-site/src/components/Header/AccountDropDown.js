import React, { useContext } from "react";
import { MenuItem, ListItemIcon, ListItemText, Menu, Link } from "@material-ui/core";
import { Person, PersonAdd, SettingsApplications } from "@material-ui/icons";
import { langDe } from "../../constants";
import { SignIn } from "../Dialogs/SignIn";
import { SignUp } from "../Dialogs/SignUp";
import { DialogStoreContext } from "../../stores/DialogStore";
import { observer } from "mobx-react-lite";

const AccountDropDown = observer((props) => {
    const dialogStore = useContext(DialogStoreContext);

    return (
        <>
            <Menu keepMounted anchorEl={props.anchorEl} open={props.open} onClose={props.onClose}>
                <MenuItem onClick={() => dialogStore.openSignIn = true}>
                    <ListItemIcon><Person color="secondary" /></ListItemIcon>
                    <ListItemText primary={langDe.signIn} />
                </MenuItem>
                <MenuItem onClick={() => dialogStore.openSignUp = true}>
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
            <SignIn open={dialogStore.openSignIn} onClose={() => dialogStore.openSignIn = false} />
            <SignUp open={dialogStore.openSignUp} onClose={() => dialogStore.openSignUp = false} />
        </>
    );
});

export { AccountDropDown };