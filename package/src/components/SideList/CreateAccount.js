import {observer} from "mobx-react-lite";
import {useStores} from "../../util/hooks";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Person, PersonAdd} from "@material-ui/icons";
import {langDe} from "../../util/lang";
import React from "react";

export const CreateAccount = observer(() => {
    const {dialogStore, userStore} = useStores();

    if (!userStore.loggedIn) {
        return (
            <>
                <ListItem button onClick={() => dialogStore.openSignIn = true}>
                    <ListItemIcon><Person color="secondary"/></ListItemIcon>
                    <ListItemText primary={langDe.signIn}/>
                </ListItem>
                <ListItem button onClick={() => dialogStore.openSignUp = true}>
                    <ListItemIcon><PersonAdd color="secondary"/></ListItemIcon>
                    <ListItemText primary={langDe.signUp}/>
                </ListItem>
            </>
        );
    } else {
        return null;
    }
});