import {ListItemIcon, ListItemText, Menu, MenuItem} from "@material-ui/core";
import {Person} from "@material-ui/icons";
import {observer} from "mobx-react-lite";
import React from "react";
import {langDe} from "../../util/lang";
import {useRemoveStorage, useSignOut, useStores} from "../../util/hooks";

const AccountDropDown = observer(() => {
    const {userStore, dialogStore, snackbarStore} = useStores();

    const signOut = () => {
        useSignOut(userStore.sid)
            .then(res => {
                if (res) {
                    useRemoveStorage(["sid", "username"]);
                    userStore.reset();
                    dialogStore.setAccount({open: false, anchorEl: null});
                    snackbarStore.openSignOutSuccess = true;
                } else {
                    snackbarStore.openSignOutFail = true;
                }
            });
    };

    if (userStore.loggedIn) {
        return (
            <Menu keepMounted={true} anchorEl={dialogStore.anchorElAccount} open={dialogStore.openAccount}
                  onClose={() => dialogStore.setAccount({open: false, anchorEl: null})}>
                <MenuItem>
                    <ListItemIcon><Person color="secondary"/></ListItemIcon>
                    <ListItemText primary={`${langDe.loggedInAs} ${userStore.username}`}/>
                </MenuItem>
                <MenuItem onClick={signOut}>
                    <ListItemIcon><Person color="secondary"/></ListItemIcon>
                    <ListItemText primary={langDe.logout}/>
                </MenuItem>
            </Menu>
        );
    } else {
        return null;
    }
});

export default AccountDropDown;
