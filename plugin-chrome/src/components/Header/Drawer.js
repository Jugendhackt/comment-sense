import React, { useContext } from "react";
import { SwipeableDrawer, makeStyles, ListItem, Typography, List, Divider, ListItemText, ListItemIcon } from "@material-ui/core";
import { langDe } from "../../constants";
import { Person, PersonAdd, ExitToApp } from "@material-ui/icons";
import { SignUp } from "../Dialogs/SignUp/";
import { SignIn } from "../Dialogs/SignIn/";
import { observer } from "mobx-react-lite";
import { DialogStoreContext } from "../../stores/DialogStore";
import { UserStoreContext } from "../../stores/UserStore";
import { removeStorage, restoreUserStore } from "../../helpers";

const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
        height: "100%"
    }
}));

const Drawer = observer((props) => {
    const dialogStore = useContext(DialogStoreContext);
    const userStore = useContext(UserStoreContext);

    const classes = useStyles();

    return (
        <SwipeableDrawer open={props.open} onClose={() => dialogStore.openDrawer = false} onOpen={props.onOpen}>
            <div className={classes.list}>
                <List>
                    <ListItem>
                        <Typography variant="h6">{langDe.brandName}</Typography>
                    </ListItem>
                    <Divider />
                    <CreateAccount display={userStore.loggedIn} />
                    <LoggedInAccount display={userStore.loggedIn} />
                </List>
            </div>
            <SignUp open={dialogStore.openSignUp} />
            <SignIn open={dialogStore.openSignIn} />
        </SwipeableDrawer>
    );
});

const CreateAccount = observer((props) => {
    const dialogStore = useContext(DialogStoreContext);

    if (!props.display) {
        return (
            <>
                <ListItem button onClick={() => dialogStore.openSignIn = true} >
                    <ListItemIcon><Person color="secondary" /></ListItemIcon>
                    <ListItemText primary={langDe.signIn} />
                </ListItem>
                <ListItem button onClick={() => dialogStore.openSignUp = true} >
                    <ListItemIcon><PersonAdd color="secondary" /></ListItemIcon>
                    <ListItemText primary={langDe.signUp} />
                </ListItem>
            </>
        );
    } else {
        return null;
    }
});

const LoggedInAccount = observer((props) => {
    const userStore = useContext(UserStoreContext);

    const logout = () => {
        restoreUserStore(userStore);
        removeStorage("sid");
        window.location.reload();
    };

    if (props.display) {
        return (
            <>
                <ListItem button>
                    <ListItemIcon><Person color="secondary" /></ListItemIcon>
                    <ListItemText primary={`${langDe.loggedInAs} ${userStore.username}`} />
                </ListItem>
                <ListItem button onClick={logout}>
                    <ListItemIcon><ExitToApp color="secondary" /></ListItemIcon>
                    <ListItemText primary={langDe.logout} />
                </ListItem>
            </>
        );
    } else {
        return null;
    }
});

export { Drawer };