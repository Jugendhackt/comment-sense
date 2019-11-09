import React, { useContext } from "react";
import { Drawer } from "./Drawer";
import { AppBar, Toolbar, IconButton, Typography, makeStyles, Box } from "@material-ui/core";
import { langDe } from "../../constants";
import { AccountCircle as AccountIcon, Menu as MenuIcon } from "@material-ui/icons";

import { AccountDropDown } from "./AccountDropDown";
import { DialogStoreContext } from "../../stores/DialogStore";
import { observer } from "mobx-react-lite";

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2)
    },
    account: {
        display: "flex",
        justifyContent: "flex-end",
        width: "100%"
    }
}));

const Navbar = observer((props) => {
    const dialogStore = useContext(DialogStoreContext);

    const classes = useStyles();

    const handleOnClick = evt => {
        if (evt && evt.target.type === "keydown" && (evt.key === "Tab" || evt.key === "Shift"))
            return;
        dialogStore.openDrawer = !dialogStore.openDrawer;
    };

    const handleClickAccount = evt => {
        dialogStore.openAccount = true;
        dialogStore.anchorElAccount = evt.currentTarget;
    };

    const handleOnClose = () => {
        dialogStore.openAccount = false;
        dialogStore.anchorElAccount = null;
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={handleOnClick}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        {langDe.brandName}
                    </Typography>
                    <Box className={classes.account}>
                        <IconButton onClick={handleClickAccount}>
                            <AccountIcon />
                        </IconButton>
                    </Box>
                    <AccountDropDown open={dialogStore.openAccount} anchorEl={dialogStore.anchorElAccount} onClose={handleOnClose} />
                </Toolbar>
            </AppBar>
            <Drawer open={dialogStore.openDrawer} onOpen={handleOnClick} onClose={() => dialogStore.openDrawer = false} />
        </div>
    );
});

export { Navbar };
