import {ListItemIcon, ListItemText, Menu, MenuItem} from "@material-ui/core";
import {Person} from "@material-ui/icons";
import {observer} from "mobx-react-lite";
import React, {useContext} from "react";
import {langDe} from "../../constants";
import {removeStorage, restoreUserStore} from "../../helpers";
import DialogStoreContext from "../../stores/DialogStore";
import UserStoreContext from "../../stores/UserStore";

const AccountDropDown = observer((props) => {
    const userStore = useContext(UserStoreContext);
    const dialogStore = useContext(DialogStoreContext);

    const handleOnClose = () => {
        dialogStore.anchorElAccount = null;
        dialogStore.openAccount = false;
    };

    const logout = () => {
        restoreUserStore(userStore);
        removeStorage("sid");
        window.location.reload();
    };

    if (userStore.loggedIn) {
        return (
            <Menu keepMounted={true} anchorEl={dialogStore.anchorElAccount} open={dialogStore.openAccount} onClose={handleOnClose}>
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
