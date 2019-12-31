import {ListItemIcon, ListItemText, Menu, MenuItem} from "@material-ui/core";
import {Person} from "@material-ui/icons";
import {observer} from "mobx-react-lite";
import React from "react";
import {langDe} from "../../util/lang";
import {removeStorage, restoreUserStore} from "../../util/helpers";
import {useStores} from "../../util/hooks";

const AccountDropDown = observer((props) => {
    const {userStore, dialogStore} = useStores();

    const handleOnClose = () => {
        dialogStore.handleAnchorElAccount(null);
        dialogStore.handleAccount(false);
    };

    const logout = () => {
        restoreUserStore(userStore);
        removeStorage("sid");
        window.location.reload();
    };

    if (userStore.loggedIn) {
        return (
            <Menu keepMounted={true} anchorEl={dialogStore.anchorElAccount} open={dialogStore.openAccount}
                  onClose={handleOnClose}>
                <MenuItem>
                    <ListItemIcon><Person color="secondary"/></ListItemIcon>
                    <ListItemText primary={`${langDe.loggedInAs} ${userStore.username}`}/>
                </MenuItem>
                <MenuItem onClick={logout}>
                    <ListItemIcon><Person color="secondary"/></ListItemIcon>
                    <ListItemText primary={langDe.logout}/>
                </MenuItem>
            </Menu>
        );
    } else {
        return null;
    }
});

export default AccountDropDown;
