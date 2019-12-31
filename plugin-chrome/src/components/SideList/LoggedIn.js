import {observer} from "mobx-react-lite";
import {useStores} from "../../util/hooks";
import {removeStorage, restoreUserStore} from "../../util/helpers";
import React from "react";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {ExitToApp, Person} from "@material-ui/icons";
import {langDe} from "../../util/lang";

export const LoggedIn = observer((props) => {
    const {userStore} = useStores();

    const logout = () => {
        restoreUserStore(userStore);
        removeStorage("sid");
        window.location.reload();
    };

    if (userStore.loggedIn) {
        return (
            <>
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