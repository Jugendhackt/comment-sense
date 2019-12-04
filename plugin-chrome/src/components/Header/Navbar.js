import React, { useContext } from "react";
import { AppBar, Typography, Toolbar, IconButton, makeStyles, Box } from "@material-ui/core";
import { Person, Menu } from "@material-ui/icons";
import { langDe } from "../../constants";
import { DialogStoreContext } from "../../stores/DialogStore";
import { Drawer } from "./Drawer";
import { observer } from "mobx-react-lite";
import { AccountDropDown } from "./AccountDropDown";
import { UserStoreContext } from "../../stores/UserStore";

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
    const classes = useStyles();
    const dialogStore = useContext(DialogStoreContext);
    const userStore = useContext(UserStoreContext);

    const handleOnClick = evt => {
        if (evt && evt.target.type === "keydown" && (evt.key === "Tab" || evt.key === "Shift"))
            return;
        dialogStore.openDrawer = !dialogStore.openDrawer;
    };

    return (
        <>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={handleOnClick} >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">{langDe.brandName}</Typography>
                    <LoggedIn loggedIn={userStore.loggedIn} />
                    <AccountDropDown open={dialogStore.openAccount} anchorEl={dialogStore.anchorElAccount} display={userStore.loggedIn} />
                </Toolbar>
            </AppBar>
            <Drawer open={dialogStore.openDrawer} onOpen={handleOnClick} />
        </>
    );
});

const LoggedIn = observer((props) => {
    const classes = useStyles();
    const dialogStore = useContext(DialogStoreContext);

    const handleOnClick = (evt) => {
        dialogStore.openAccount = true;
        dialogStore.anchorElAccount = evt.currentTarget;
    };

    if (props.loggedIn) {
        return (
            <Box className={classes.account}>
                <IconButton color="inherit" onClick={handleOnClick} >
                    <Person color="secondary" />
                </IconButton>
            </Box>
        );
    } else {
        return null;
    }
});

export { Navbar };