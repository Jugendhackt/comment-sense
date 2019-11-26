import React, { useContext } from "react";
import { AppBar, Typography, Toolbar, IconButton, makeStyles } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import { langDe } from "../../constants";
import { UserStoreContext } from "../../stores/UserStore";

const useStyles = makeStyles(theme => ({
    box: {
        display: "flex",
        justifyContent: "space-between"
    }
}));


const Navbar = (props) => {
    const classes = useStyles();
    const userStore = useContext(UserStoreContext);
    return (
        <AppBar position="static">
            <Toolbar className={classes.box}>
                <Typography variant="h6">{langDe.brandName}</Typography>
                <LoggedIn loggedIn={userStore.loggedIn}/>
            </Toolbar>
        </AppBar>
    );    
};

const LoggedIn = (props) => {
    if (props.loggedIn) {
        return (
            <IconButton>
                <Person color="secondary" />
            </IconButton>
        );
    } else {
        return null;
    }
};

export { Navbar };