import React from "react";
import {observer} from "mobx-react-lite";
import {AppBar, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useStores} from "../../util/hooks";
import {langDe} from "../../util/lang";
import {SideList} from "./SideList";
import {Account} from "./Account";

const useStyles = makeStyles(theme => ({
    IconButton: {
        marginRight: theme.spacing(2)
    }
}));

const Header = observer(() => {
    const {dialogStore} = useStores();
    const classes = useStyles();

    const handleDrawer = evt => {
        if (evt && evt.target.type === "keydown" && (evt.key === "Tab" || evt.key === "Shift"))
            return;
        dialogStore.openDrawer = !dialogStore.openDrawer;
    };

    return (
        <>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton edge="start" color="inherit" className={classes.IconButton} onClick={handleDrawer}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">{langDe.brandName}</Typography>
                    <Account/>
                </Toolbar>
            </AppBar>
            <SideList/>
        </>
    );
});

export default Header;