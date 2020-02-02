import React from "react";
import {useStores} from "../../../util/hooks";
import {Divider, Drawer, Link, List, ListItem, ListItemIcon, ListItemText, Typography} from "@material-ui/core";
import {langDe} from "../../../util/lang";
import {Code, Home} from "@material-ui/icons";
import {UserList} from "./UserList";
import {observer} from "mobx-react-lite";

const SideList = observer(() => {
    const {dialogStore} = useStores();

    const onClose = () => {
        dialogStore.openDrawer = false;
    };

    return (
        <Drawer open={dialogStore.openDrawer} onClose={onClose}>
            <List>
                <ListItem>
                    <Typography variant="h6">{langDe.brandName}</Typography>
                </ListItem>
                <Divider/>
                <Link color="inherit" href="/">
                    <ListItem button>
                        <ListItemIcon><Home color="secondary"/></ListItemIcon>
                        <ListItemText>{langDe.home}</ListItemText>
                    </ListItem>
                </Link>
                <UserList/>
                <Link color="inherit" href="https://github.com/Jugendhackt/comment-sense/">
                    <ListItem button>
                        <ListItemIcon><Code color="secondary"/></ListItemIcon>
                        <ListItemText>{langDe.github}</ListItemText>
                    </ListItem>
                </Link>
            </List>
        </Drawer>
    );
});

export default SideList;