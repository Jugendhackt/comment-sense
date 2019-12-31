import React from "react";
import {AppBar, Box, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {Menu, Person} from "@material-ui/icons";
import {langDe} from "../../util/lang";
import {SideList} from "../SideList";
import {observer} from "mobx-react-lite";
import AccountDropDown from "./AccountDropDown";
import {useStores} from "../../util/hooks";

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
    const {dialogStore} = useStores();

    const classes = useStyles();

    const handleOnClick = evt => {
        if (evt && evt.target.type === "keydown" && (evt.key === "Tab" || evt.key === "Shift"))
            return;
        dialogStore.handleDrawer(!dialogStore.openDrawer);
    };

    return (
        <React.Fragment>
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
            <SideList/>
        </React.Fragment>
    );
});

const LoggedIn = observer((props) => {
    const {dialogStore} = useStores();
    const {userStore} = useStores();

    const classes = useStyles();

    const handleOnClick = (evt) => {
        dialogStore.handleAccount(true);
        dialogStore.handleAnchorElAccount(evt.currentTarget);
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