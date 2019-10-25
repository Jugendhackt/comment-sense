import React, { useState } from "react";
import { Drawer } from "./Drawer";
import { AppBar, Toolbar, IconButton, Typography, makeStyles } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { langDe } from "../../constants";

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2)
    },
    navbar: {
        margin: 0
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
            <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={handleOnClick}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        {langDe.brandName}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer open={open} onClose={handleOnClick} onOpen={handleOnClick} />
        </div>
    );
};

export { Navbar };
