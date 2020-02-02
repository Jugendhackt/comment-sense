import React from "react";
import {observer} from "mobx-react-lite";
import {useSignOut, useStorage, useStores} from "../../util/hooks";
import {Box, IconButton, Link, ListItemIcon, ListItemText, makeStyles, Menu, MenuItem} from "@material-ui/core";
import {Person} from "@material-ui/icons";
import {langDe} from "../../util/lang";

const useStyles = makeStyles(() => ({
    Box: {
        display: "flex",
        justifyContent: "flex-end",
        width: "100%"
    }
}));

export const Account = observer(() => {
    const {userStore, dialogStore, snackbarStore} = useStores();
    const classes = useStyles();

    const openAccount = evt => {
        dialogStore.setAccount(true, evt.currentTarget);
    };

    const onClose = () => {
        dialogStore.setAccount(false, null);
    };

    const signOut = async () => {
        const response = await useSignOut(userStore.sid);
        if (response) {
            useStorage.remove(["sid", "username"]);
            userStore.reset();
            dialogStore.setAccount(false, null);
            snackbarStore.openSignOutSuccess = true;
        } else {
            snackbarStore.openSignOutFail = true;
        }
    };

    if (userStore.loggedIn) {
        return (
            <>
                <Box className={classes.Box}>
                    <IconButton color="inherit" onClick={openAccount}>
                        <Person/>
                    </IconButton>
                </Box>
                <Menu keepMounted anchorEl={dialogStore.anchorElAccount} open={dialogStore.openAccount}
                      onClose={onClose}>
                    <MenuItem>
                        <ListItemIcon><Person color="secondary"/></ListItemIcon>
                        <ListItemText>{`${langDe.loggedInAs} ${userStore.username}`}</ListItemText>
                    </MenuItem>
                    <Link color="inherit" href={"/account/"}>
                        <MenuItem>
                            <ListItemIcon><Person color="secondary"/></ListItemIcon>
                            <ListItemText>{langDe.account}</ListItemText>
                        </MenuItem>
                    </Link>
                    <MenuItem onClick={signOut}>
                        <ListItemIcon><Person color="secondary"/></ListItemIcon>
                        <ListItemText>{langDe.logout}</ListItemText>
                    </MenuItem>
                </Menu>
            </>
        );
    } else {
        return null;
    }
});