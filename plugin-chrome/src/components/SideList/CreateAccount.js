import {observer} from "mobx-react-lite";
import {useStores} from "../../util/hooks";
import React from "react";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Person, PersonAdd} from "@material-ui/icons";
import {langDe} from "../../util/lang";

export const CreateAccount = observer((props) => {
    const {dialogStore} = useStores();
    const {userStore} = useStores();

    if (!userStore.loggedIn) {
        return (
            <>
                <ListItem button onClick={() => dialogStore.handleSignIn(true)}>
                    <ListItemIcon><Person color="secondary"/></ListItemIcon>
                    <ListItemText primary={langDe.signIn}/>
                </ListItem>
                <ListItem button onClick={() => dialogStore.handleSignUp(true)}>
                    <ListItemIcon><PersonAdd color="secondary"/></ListItemIcon>
                    <ListItemText primary={langDe.signUp}/>
                </ListItem>
            </>
        );
    } else {
        return null;
    }
});