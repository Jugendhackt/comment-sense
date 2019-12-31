import React from "react";
import {observer} from "mobx-react-lite";
import {makeStyles} from "@material-ui/styles";
import {Button} from "@material-ui/core";
import {langDe} from "../../util/lang";
import {CreateComment} from "../CreateComment";
import {useStores} from "../../util/hooks";

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

const Footer = observer((props) => {
    const {dialogStore, userStore} = useStores();

    const classes = useStyles();

    if (userStore.loggedIn) {
        return (
            <>
                <CreateComment/>
                <footer className={classes.footer}>
                    <Button onClick={() => dialogStore.handleComment(true)}>{langDe.addComment}</Button>
                </footer>
            </>
        );
    } else {
        return null;
    }
});

export default Footer;