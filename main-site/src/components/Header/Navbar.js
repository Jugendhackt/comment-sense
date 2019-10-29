import React, { useState } from "react";
import { Drawer } from "./Drawer";
import { AppBar, Toolbar, IconButton, Typography, makeStyles, Box } from "@material-ui/core";
import { langDe } from "../../constants";
import { AccountCircle as AccountIcon, Menu as MenuIcon } from "@material-ui/icons";

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
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleOnClick = evt => {
        if (evt && evt.target.type === "keydown" && (evt.key === "Tab" || evt.key === "Shift"))
            return;
        setOpen(!open);
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
                        <IconButton>
                            <AccountIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer open={open} onClose={handleOnClick} onOpen={handleOnClick} />
        </div>
    );
};

export { Navbar };
