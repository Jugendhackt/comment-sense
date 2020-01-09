import React from "react";
import {AppBar, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {langDe} from "../../util/lang";
import {SideList} from "../SideList";
import {observer} from "mobx-react-lite";
import AccountDropDown from "./AccountDropDown";
import {LoggedIn} from "./LoggedIn";
import {useStores} from "../../util/hooks";

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2)
    }
}));


const Navbar = observer(() => {
    const {dialogStore} = useStores();

    const classes = useStyles();

    const handleOnClick = evt => {
        if (evt && evt.target.type === "keydown" && (evt.key === "Tab" || evt.key === "Shift"))
            return;
        dialogStore.handleDrawer(!dialogStore.openDrawer);
    };

    return (
        <>
            <AppBar position="sticky">
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
        </>
    );
});

export default Navbar;