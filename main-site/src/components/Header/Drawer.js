import React, { useContext } from "react";
import { SwipeableDrawer, makeStyles, ListItem, Typography, List, Divider, Link, ListItemText, ListItemIcon } from "@material-ui/core";
import { langDe } from "../../constants";
import { Home, Person, PersonAdd, SettingsApplications, Code } from "@material-ui/icons";
import { SignUp } from "../Dialogs/SignUp/";
import { SignIn } from "../Dialogs/SignIn/";
import { observer } from "mobx-react-lite";
import { DialogStoreContext } from "../../stores/DialogStore";
import { UserStoreContext } from "../../stores/UserStore";

const useStyles = makeStyles(theme => ({
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
        <SwipeableDrawer open={props.open} onClose={props.onClose} onOpen={props.onClose}>
            <div className={classes.list}>
                <List>
                    <ListItem>
                        <Typography variant="h6">{langDe.brandName}</Typography>
                    </ListItem>
                    <Divider />
                    <Link color="inherit" href="/">
                        <ListItem button>
                            <ListItemIcon><Home color="secondary" /></ListItemIcon>
                            <ListItemText primary={langDe.home} />
                        </ListItem>
                    </Link>
                    <CreateAccount display={userStore.loggedIn} onClickSignIn={() => dialogStore.openSignIn = true} onClickSignUp={() => dialogStore.openSignUp = true} />
                    <LoggedInAccount display={userStore.loggedIn} />
                    <Link color="inherit" href="https://github.com/Jugendhackt/comment-sense/">
                        <ListItem button>
                            <ListItemIcon><Code color="secondary" /></ListItemIcon>
                            <ListItemText primary={langDe.github} />
                        </ListItem>
                    </Link>
                </List>
            </div>
            <SignUp open={dialogStore.openSignUp} onClose={() => dialogStore.openSignUp = false} />
            <SignIn open={dialogStore.openSignIn} onClose={() => dialogStore.openSignIn = false} />
        </SwipeableDrawer>
    );
});

const CreateAccount = (props) => {
    if (!props.display) {
        return (
            <>
                <ListItem button onClick={props.onClickSignIn} >
                    <ListItemIcon><Person color="secondary" /></ListItemIcon>
                    <ListItemText primary={langDe.signIn} />
                </ListItem>
                <ListItem button onClick={props.onClickSignUp} >
                    <ListItemIcon><PersonAdd color="secondary" /></ListItemIcon>
                    <ListItemText primary={langDe.signUp} />
                </ListItem>
            </>
        );
    } else {
        return null;
    }
};

const LoggedInAccount = observer((props) => {
    const userStore = useContext(UserStoreContext);
    
    if (props.display) {
        return (
            <>
                <Link color="inherit" href="/account/">
                    <ListItem button>
                        <ListItemIcon><SettingsApplications color="secondary" /></ListItemIcon>
                        <ListItemText primary={langDe.account} />
                    </ListItem>
                </Link>
                <ListItem button>
                    <ListItemIcon><Person color="secondary" /></ListItemIcon>
                    <ListItemText primary={`${langDe.loggedInAs} ${userStore.username}`} />
                </ListItem>
            </>
        );
    } else {
        return null;
    }
});

export { Drawer };