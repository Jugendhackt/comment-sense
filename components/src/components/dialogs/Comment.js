import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";
import {observer} from "mobx-react-lite";
import React, {useContext} from "react";
import {langDe} from "../../constants";
import DialogStoreContext from "../../stores/DialogStore";
import UserStoreContext from "../../stores/UserStore";
import {makeStyles} from "@material-ui/styles";
import {getCurrentTab, postCommentRoute} from "../../helpers";
import Alert from "./Alert";

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

const Comment = observer((props) => {
    const classes = useStyles();
    const dialogStore = useContext(DialogStoreContext);
    const userStore = useContext(UserStoreContext);

    const sendComment = () => {
        getCurrentTab().then((url) => {
            fetch(postCommentRoute(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    sid: userStore.sid,
                    url: url,
                    headline: userStore.title,
                    content: userStore.comment
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        dialogStore.openCommentSuccess = true;
                    } else {
                        dialogStore.openCommentFail = true;
                    }
                })
                .catch(e => {
                    dialogStore.openCommentFail = true;
                })
        });
    };

    return (
        <React.Fragment>
            <Dialog open={dialogStore.openComment} onClose={() => dialogStore.openComment = false} fullScreen={true}>
                <DialogTitle>{langDe.addComment}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{langDe.addCommentText}</DialogContentText>
                    <TextField autoFocus={true} fullWidth placeholder={langDe.commentTitle} size="medium"
                               className={classes.textField} onChange={(evt) => userStore.title = evt.target.value}/>
                    <TextField fullWidth multiline={true} placeholder={langDe.commentText} size="medium" rows={6}
                               className={classes.textField} onChange={(evt) => userStore.comment = evt.target.value}/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={sendComment}>{langDe.commentSend}</Button>
                    <Button variant="contained" color="secondary"
                            onClick={() => dialogStore.openComment = false}>{langDe.cancel}</Button>
                </DialogActions>
            </Dialog>
            <Alert open={dialogStore.openCommentSuccess} onClose={() => dialogStore.openCommentSuccess = false}
                   title={langDe.commentSuccessTitle} text={langDe.commentSuccessText}/>
            <Alert open={dialogStore.openCommentFail} onClose={() => dialogStore.openCommentFail = false}
                   title={langDe.commentFailTitle} text={langDe.commentFailText}/>
        </React.Fragment>
    );
});

export default Comment;
