import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {makeStyles} from "@material-ui/styles";
import {Button} from "@material-ui/core";
import {langDe} from "../../constants";
import {DialogStoreContext} from "../../stores/DialogStore";
import Comment from "../Dialogs/CommentDialog/Comment";

const useStyles = makeStyles((theme) => ({
    footer: {
        display: "flex",
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: theme.palette.primary.main,
        height: 50,
        justifyContent: "center"
    }
}));

const Footer = observer((props) => {
    const dialogStore = useContext(DialogStoreContext);

    const classes = useStyles();

    return (
        <>
            <Comment/>
            <footer className={classes.footer}>
                <Button onClick={() => dialogStore.openComment = true}>{langDe.addComment}</Button>
            </footer>
        </>
    );
});

export default Footer;