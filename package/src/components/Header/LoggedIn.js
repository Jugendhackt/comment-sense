import {observer} from "mobx-react-lite";
import {useStores} from "../../util/hooks";
import {Box, IconButton, makeStyles} from "@material-ui/core";
import {Person} from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles(() => ({
    account: {
        display: "flex",
        justifyContent: "flex-end",
        width: "100%"
    }
}));

export const LoggedIn = observer((props) => {
    const {dialogStore, userStore} = useStores();

    const classes = useStyles();

    const handleOnClick = (evt) => {
        dialogStore.handleAccount(true);
        dialogStore.handleAnchorElAccount(evt.currentTarget);
    };

    if (userStore.loggedIn) {
        return (
            <Box className={classes.account}>
                <IconButton color="inherit" onClick={handleOnClick}>
                    <Person/>
                </IconButton>
            </Box>
        );
    } else {
        return null;
    }
});

export default LoggedIn;