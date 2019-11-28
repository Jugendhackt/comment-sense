import React, { useContext } from "react";
import { AppBar, Typography, Toolbar, IconButton, makeStyles } from "@material-ui/core";
import { Person, Menu } from "@material-ui/icons";
import { langDe } from "../../constants";
import { UserStoreContext } from "../../stores/UserStore";
import { DialogStoreContext } from "../../stores/DialogStore";
import { Drawer } from "./Drawer";
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
    const classes = useStyles();
    const userStore = useContext(UserStoreContext);
    const dialogStore = useContext(DialogStoreContext);

    const handleOnClick = evt => {
        if (evt && evt.target.type === "keydown" && (evt.key === "Tab" || evt.key === "Shift"))
            return;
        dialogStore.openDrawer = !dialogStore.openDrawer;
    };
    
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={handleOnClick} >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">{langDe.brandName}</Typography>
                    <LoggedIn loggedIn={userStore.loggedIn} />
                </Toolbar>
                <Drawer open={dialogStore.openDrawer} onOpen={handleOnClick} />
            </AppBar>
        </>
    );
});

const LoggedIn = observer((props) => {
    const classes = useStyles();
    if (props.loggedIn) {
        return (
            <IconButton className={classes.account}>
                <Person color="secondary" />
            </IconButton>
        );
    } else {
        return null;
    }
});

export { Navbar };