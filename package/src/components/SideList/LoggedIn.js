import {observer} from "mobx-react-lite";
import {useRemoveStorage, useStores} from "../../util/hooks";
import {Link, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {ExitToApp, Person, SettingsApplications} from "@material-ui/icons";
import {langDe} from "../../util/lang";
import React from "react";

export const LoggedIn = observer((props) => {
    const {userStore} = useStores();

    const logout = () => {
        userStore.loggedIn = false;
        userStore.password = "";
        userStore.username = "";
        userStore.email = "";
        userStore.sid = "";
        useRemoveStorage("sid");
        window.location.reload();
    };

    if (userStore.loggedIn) {
        return (
            <>
                <Link color="inherit" href="/account/">
                    <ListItem button>
                        <ListItemIcon><SettingsApplications color="secondary"/></ListItemIcon>
                        <ListItemText primary={langDe.account}/>
                    </ListItem>
                </Link>
                <ListItem button>
                    <ListItemIcon><Person color="secondary"/></ListItemIcon>
                    <ListItemText primary={`${langDe.loggedInAs} ${userStore.username}`}/>
                </ListItem>
                <ListItem button onClick={logout}>
                    <ListItemIcon><ExitToApp color="secondary"/></ListItemIcon>
                    <ListItemText primary={langDe.logout}/>
                </ListItem>
            </>
        );
    } else {
        return null;
    }
});
export default LoggedIn;