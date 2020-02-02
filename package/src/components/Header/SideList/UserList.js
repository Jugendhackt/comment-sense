import React from "react";
import {observer} from "mobx-react-lite";
import {useSignOut, useStorage, useStores} from "../../../util/hooks";
import {Link, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {ExitToApp, Person, PersonAdd, SettingsApplications} from "@material-ui/icons";
import {langDe} from "../../../util/lang";

export const UserList = observer(() => {
    const {userStore, dialogStore, snackbarStore} = useStores();

    const openSignIn = () => {
        dialogStore.openSignIn = true;
    };

    const openSignUp = () => {
        dialogStore.openSignUp = true;
    };

    const signOut = async () => {
        const response = await useSignOut(userStore.sid);
        if (response) {
            userStore.reset();
            useStorage.remove(["sid", "username"]);
            dialogStore.openDrawer = false;
            snackbarStore.openSignOutSuccess = true;
        } else {
            snackbarStore.openSignOutFail = true;
        }
    };

    if (!userStore.loggedIn) {
        return (
            <>
                <ListItem button onClick={openSignIn}>
                    <ListItemIcon><Person color="secondary"/></ListItemIcon>
                    <ListItemText>{langDe.signIn}</ListItemText>
                </ListItem>
                <ListItem button onClick={openSignUp}>
                    <ListItemIcon><PersonAdd color="secondary"/></ListItemIcon>
                    <ListItemText>{langDe.signUp}</ListItemText>
                </ListItem>
            </>
        );
    } else {
        return (
            <>
                <Link color="inherit" href={"/account/"}>
                    <ListItem button>
                        <ListItemIcon><SettingsApplications color="secondary"/></ListItemIcon>
                        <ListItemText>{langDe.account}</ListItemText>
                    </ListItem>
                </Link>
                <ListItem button>
                    <ListItemIcon><Person color="secondary"/></ListItemIcon>
                    <ListItemText>{`${langDe.loggedInAs} ${userStore.username}`}</ListItemText>
                </ListItem>
                <ListItem button onClick={signOut}>
                    <ListItemIcon><ExitToApp color="secondary"/></ListItemIcon>
                    <ListItemText>{langDe.logout}</ListItemText>
                </ListItem>
            </>
        );
    }
});