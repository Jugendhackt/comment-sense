import React, { useContext } from "react";
import { MenuItem, ListItemIcon, ListItemText, Menu, Link } from "@material-ui/core";
import { Person, SettingsApplications } from "@material-ui/icons";
import { langDe } from "../../constants";
import { observer } from "mobx-react-lite";
import { UserStoreContext } from "../../stores/UserStore";
import { DialogStoreContext } from "../../stores/DialogStore";
import { removeSessionId } from "../../helpers";

const AccountDropDown = observer((props) => {
    const userStore = useContext(UserStoreContext);
    const dialogStore = useContext(DialogStoreContext);

    const handleOnClose = () => {
        dialogStore.anchorElAccount = null;
        dialogStore.openAccount = false;
    };

    const logout = () => {
        userStore.username = "";
        userStore.password = "";
        userStore.email = "";
        userStore.sid = "";
        userStore.loggedIn = false;
        removeSessionId();
        window.location.reload();
    };

    if (props.display) {
        return (
            <Menu keepMounted anchorEl={props.anchorEl} open={props.open} onClose={handleOnClose}>
                <MenuItem>
                    <ListItemIcon><Person color="secondary" /></ListItemIcon>
                    <ListItemText primary={`${langDe.loggedInAs} ${userStore.username}`} />
                </MenuItem>
                <Link color="inherit" href="/account/">
                    <MenuItem>
                        <ListItemIcon><SettingsApplications color="secondary" /></ListItemIcon>
                        <ListItemText primary={langDe.account} />
                    </MenuItem>
                </Link>
                <MenuItem onClick={logout}>
                    <ListItemIcon><Person color="secondary" /></ListItemIcon>
                    <ListItemText primary={langDe.logout} />
                </MenuItem>
            </Menu>
        );
    } else {
        return null;
    }
});

export default AccountDropDown;