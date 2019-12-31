import React from "react";
import {
    Drawer,
    makeStyles,
    ListItem,
    Typography,
    List,
    Divider
} from "@material-ui/core";
import {langDe} from "../../util/lang";
import {SignUp} from "../SignUp";
import {SignIn} from "../SignIn";
import {CreateAccount} from "./CreateAccount";
import {LoggedIn} from "./LoggedIn";
import {observer} from "mobx-react-lite";
import {useStores} from "../../util/hooks";

const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
        height: "100%"
    }
}));

const SideList = observer((props) => {
    const {dialogStore} = useStores();
    const classes = useStyles();

    return (
        <Drawer open={dialogStore.openDrawer} onClose={() => dialogStore.handleDrawer(false)}>
            <div className={classes.list}>
                <List>
                    <ListItem>
                        <Typography variant="h6">{langDe.brandName}</Typography>
                    </ListItem>
                    <Divider/>
                    <CreateAccount/>
                    <LoggedIn/>
                </List>
            </div>
            <SignUp/>
            <SignIn/>
        </Drawer>
    );
});

export default SideList;