import React from "react";
import {
    Drawer,
    makeStyles,
    ListItem,
    Typography,
    List,
    Divider,
    Link,
    ListItemText,
    ListItemIcon
} from "@material-ui/core";
import {langDe} from "../../util/lang";
import {Home, Code} from "@material-ui/icons";
import {SignUp} from "../SignUp";
import {SignIn} from "../SignIn";
import {observer} from "mobx-react-lite";
import {useStores} from "../../util/hooks";
import {LoggedIn} from "./LoggedIn";
import {CreateAccount} from "./CreateAccount";

const useStyles = makeStyles(theme => ({
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
                    <Link color="inherit" href="/">
                        <ListItem button>
                            <ListItemIcon><Home color="secondary"/></ListItemIcon>
                            <ListItemText primary={langDe.home}/>
                        </ListItem>
                    </Link>
                    <CreateAccount/>
                    <LoggedIn/>
                    <Link color="inherit" href="https://github.com/Jugendhackt/comment-sense/">
                        <ListItem button>
                            <ListItemIcon><Code color="secondary"/></ListItemIcon>
                            <ListItemText primary={langDe.github}/>
                        </ListItem>
                    </Link>
                </List>
            </div>
            <SignUp/>
            <SignIn/>
        </Drawer>
    );
});

export default SideList;