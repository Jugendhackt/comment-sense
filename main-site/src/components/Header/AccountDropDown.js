import React, { useContext } from "react";
import { MenuItem, ListItemIcon, ListItemText, Menu, Link } from "@material-ui/core";
import { Person, SettingsApplications } from "@material-ui/icons";
import { langDe } from "../../constants";
import { observer } from "mobx-react-lite";
import { UserStoreContext } from "../../stores/UserStore";

const AccountDropDown = observer((props) => {
    const userStore = useContext(UserStoreContext);

    return (
        <Menu keepMounted anchorEl={props.anchorEl} open={props.open} onClose={props.onClose}>
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
        </Menu>
    );
});

export { AccountDropDown };