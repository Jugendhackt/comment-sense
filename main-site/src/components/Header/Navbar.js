import React, { useState } from "react";
import { Drawer } from "./Drawer";
import { AppBar, Toolbar, IconButton, Typography, makeStyles, Box } from "@material-ui/core";
import { langDe } from "../../constants";
import { AccountCircle as AccountIcon, Menu as MenuIcon } from "@material-ui/icons";

import { AccountDropDown } from "./AccountDropDown";

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

function Navbar(props) {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openAccount, setOpenAccount] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const classes = useStyles();

    const handleOnClick = evt => {
        if (evt && evt.target.type === "keydown" && (evt.key === "Tab" || evt.key === "Shift"))
            return;
        setOpenDrawer(!openDrawer);
    };

    const handleClickAccount = evt => {
        setOpenAccount(true);
        setAnchorEl(evt.currentTarget);
    };

    const handleOnClose = () => {
        setOpenAccount(false);
        setAnchorEl(null);
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
                    <AccountDropDown open={openAccount} anchorEl={anchorEl} onClose={handleOnClose} />
                </Toolbar>
            </AppBar>
            <Drawer open={openDrawer} onClose={handleOnClick} onOpen={handleOnClick} onClose={() => setOpenDrawer(false)} />
        </div>
    );
};

export { Navbar };
