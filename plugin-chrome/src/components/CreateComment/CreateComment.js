import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    TextField
} from "@material-ui/core";
import {observer} from "mobx-react-lite";
import React, {useState} from "react";
import {useCurrentTab, useStores} from "package/util/hooks";
import {langDe} from "package/util/lang";
import {Routes} from "package/util/routes";

const useStyles = makeStyles((theme) => ({
    textField: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1)
    },
    center: {
        display: "flex",
        justifyContent: "center"
    }
}));

export const CreateComment = observer((props) => {
    const [url, setUrl] = useState("");
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    const classes = useStyles();
    const {userStore, dialogStore, snackbarStore} = useStores();

    useCurrentTab().then(url => {
        setUrl(url);
    });

    const sendComment = () => {
        console.log(url, "hi");
        fetch(Routes.postComment(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sid: userStore.sid,
                url: url,
                headline: title,
                content: comment,
                username: userStore.username
            })
        })
            .then(res => {
                dialogStore.openComment = false;
                if (res.status === 200) {
                    snackbarStore.openCommentSuccess = true;
                } else {
                    snackbarStore.openCommentFail = true;
                }
            })
            .catch(e => {
                snackbarStore.openCommentFail = true;
            })
    };

    return (
        <>
            <Dialog open={dialogStore.openComment} onClose={() => dialogStore.openComment = false} fullScreen={true}>
                <DialogTitle>{langDe.addComment}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{langDe.addCommentText}</DialogContentText>
                    <TextField autoFocus={true} fullWidth placeholder={langDe.commentTitle} size="medium"
                               className={classes.textField}
                               onChange={(evt) => setTitle(evt.target.value)}/>
                    <TextField fullWidth multiline={true} placeholder={langDe.commentText} size="medium" rows={6}
                               className={classes.textField}
                               onChange={(evt) => setComment(evt.target.value)}/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={sendComment}>{langDe.commentSend}</Button>
                    <Button variant="contained" color="secondary"
                            onClick={() => dialogStore.openComment = false}>{langDe.cancel}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
});

export default CreateComment;
