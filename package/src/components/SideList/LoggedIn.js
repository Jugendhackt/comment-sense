import {observer} from "mobx-react-lite";
import {useRemoveStorage, useSignOut, useStores} from "../../util/hooks";
import {Link, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {ExitToApp, Person, SettingsApplications} from "@material-ui/icons";
import {langDe} from "../../util/lang";
import React from "react";

export const LoggedIn = observer(() => {
    const {userStore, dialogStore, snackbarStore} = useStores();

    const signOut = () => {
        useSignOut(userStore.sid)
            .then(res => {
                if (res) {
                    userStore.reset();
                    useRemoveStorage(["sid", "username"]);
                    dialogStore.openDrawer = false;
                    snackbarStore.openSignOutSuccess = true;
                } else {
                    snackbarStore.openSignOutFail = true;
                }
            });
    };

    if (userStore.loggedIn) {
        return (
            <>
                <Link color="inherit" href={"/account/"}>
                    <ListItem button>
                        <ListItemIcon><SettingsApplications color="secondary"/></ListItemIcon>
                        <ListItemText primary={langDe.account}/>
                    </ListItem>
                </Link>
                <ListItem button>
                    <ListItemIcon><Person color="secondary"/></ListItemIcon>
                    <ListItemText primary={`${langDe.loggedInAs} ${userStore.username}`}/>
                </ListItem>
                <ListItem button onClick={signOut}>
                    <ListItemIcon><ExitToApp color="secondary"/></ListItemIcon>
                    <ListItemText primary={langDe.logout}/>
                </ListItem>
            </>
        );
    } else {
        return null;
    }
});