import React, {useContext} from "react";
import {AppBar, Box, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {Menu, Person} from "@material-ui/icons";
import {langDe} from "../../constants";
import {DialogStoreContext} from "../../stores/DialogStore";
import Drawer from "./Drawer";
import {observer} from "mobx-react-lite";
import AccountDropDown from "./AccountDropDown";
import {UserStoreContext} from "../../stores/UserStore";

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
    const userStore = useContext(UserStoreContext);

    const classes = useStyles();

    const handleOnClick = evt => {
        if (evt && evt.target.type === "keydown" && (evt.key === "Tab" || evt.key === "Shift"))
            return;
        dialogStore.openDrawer = !dialogStore.openDrawer;
    };

    return (
        <>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={handleOnClick}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">{langDe.brandName}</Typography>
                    <LoggedIn/>
                    <AccountDropDown/>
                </Toolbar>
            </AppBar>
            <Drawer onOpen={handleOnClick}/>
        </>
    );
});

const LoggedIn = observer((props) => {
    const dialogStore = useContext(DialogStoreContext);
    const userStore = useContext(UserStoreContext);

    const classes = useStyles();

    const handleOnClick = (evt) => {
        dialogStore.openAccount = true;
        dialogStore.anchorElAccount = evt.currentTarget;
    };

    if (userStore.loggedIn) {
        return (
            <Box className={classes.account}>
                <IconButton color="inherit" onClick={handleOnClick}>
                    <Person color="secondary"/>
                </IconButton>
            </Box>
        );
    } else {
        return null;
    }
});

export default Navbar;