import React from "react";
import {observer} from "mobx-react-lite";
import {Button, makeStyles} from "@material-ui/core";
import {useStores} from "package/util/hooks";
import {langDe} from "package/util/lang";
import {CreateComment} from "../CreateComment";

const useStyles = makeStyles((theme) => ({
    footer: {
        display: "flex",
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: theme.palette.primary.main,
        height: 50,
        justifyContent: "center"
    }
}));

const Footer = observer(() => {
    const {dialogStore, userStore} = useStores();
    const classes = useStyles();

    if (userStore.loggedIn) {
        return (
            <>
                <CreateComment/>
                <footer className={classes.footer}>
                    <Button onClick={() => dialogStore.openComment = true}>{langDe.addComment}</Button>
                </footer>
            </>
        );
    } else {
        return null;
    }
});

export default Footer;