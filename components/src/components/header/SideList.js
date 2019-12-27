import React, {useContext} from "react";
import {
    Drawer,
    makeStyles,
    ListItem,
    Typography,
    List,
    Divider,
    ListItemText,
    ListItemIcon
} from "@material-ui/core";
import {langDe} from "../../constants";
import {Person, PersonAdd, ExitToApp} from "@material-ui/icons";
import SignUp from "../../components/dialogs/SignUp";
import SignIn from "../../components/dialogs/SignIn";
import {observer} from "mobx-react-lite";
import DialogStoreContext from "../../stores/DialogStore";
import UserStoreContext from "../../stores/UserStore";
import {removeStorage, restoreUserStore} from "../../helpers";

const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
        height: "100%"
    }
}));

const SideList = observer((props) => {
    const dialogStore = useContext(DialogStoreContext);
    const classes = useStyles();

    return (
        <Drawer open={dialogStore.openDrawer} onClose={() => dialogStore.openDrawer = false}
                         onOpen={props.onOpen}>
            <div className={classes.list}>
                <List>
                    <ListItem>
                        <Typography variant="h6">{langDe.brandName}</Typography>
                    </ListItem>
                    <Divider/>
                    <CreateAccount/>
                    <LoggedInAccount/>
                </List>
            </div>
            <SignUp/>
            <SignIn/>
        </Drawer>
    );
});

const CreateAccount = observer((props) => {
    const dialogStore = useContext(DialogStoreContext);
    const userStore = useContext(UserStoreContext);

    if (!userStore.loggedIn) {
        return (
            <React.Fragment>
                <ListItem button onClick={() => dialogStore.openSignIn = true}>
                    <ListItemIcon><Person color="secondary"/></ListItemIcon>
                    <ListItemText primary={langDe.signIn}/>
                </ListItem>
                <ListItem button onClick={() => dialogStore.openSignUp = true}>
                    <ListItemIcon><PersonAdd color="secondary"/></ListItemIcon>
                    <ListItemText primary={langDe.signUp}/>
                </ListItem>
            </React.Fragment>
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

    if (userStore.loggedIn) {
        return (
            <React.Fragment>
                <ListItem button>
                    <ListItemIcon><Person color="secondary"/></ListItemIcon>
                    <ListItemText primary={`${langDe.loggedInAs} ${userStore.username}`}/>
                </ListItem>
                <ListItem button onClick={logout}>
                    <ListItemIcon><ExitToApp color="secondary"/></ListItemIcon>
                    <ListItemText primary={langDe.logout}/>
                </ListItem>
            </React.Fragment>
        );
    } else {
        return null;
    }
});

export default SideList;