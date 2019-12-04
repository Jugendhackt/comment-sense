import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { langDe, ipAddress } from "../../../constants";
import { DialogStoreContext } from "../../../stores/DialogStore";
import { UserStoreContext } from "../../../stores/UserStore";
import { makeStyles } from "@material-ui/styles";
import { getCurrentTab } from "../../../helpers";
import { CommentSuccess } from "./CommentSuccess";
import { CommentFail } from "./CommentFail";

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
            fetch(`${ipAddress}/api/comments/`, {
                method: "POST",
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
        });
    };

    return (
        <>
            <Dialog open={props.open} onClose={() => dialogStore.openComment = false} fullScreen={true}>
                <DialogTitle>{langDe.addComment}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{langDe.addCommentText}</DialogContentText>
                    <TextField autoFocus={true} fullWidth placeholder={langDe.commentTitle} size="medium" className={classes.textField} onChange={(evt) => userStore.title = evt.target.value} />
                    <TextField fullWidth multiline={true} placeholder={langDe.commentText} size="medium" rows={6} className={classes.textField} onChange={(evt) => userStore.comment = evt.target.value} />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={sendComment}>{langDe.commentSend}</Button>
                    <Button variant="contained" color="secondary" onClick={() => dialogStore.openComment = false}>{langDe.cancel}</Button>
                </DialogActions>
            </Dialog>
            <CommentSuccess open={dialogStore.openCommentSuccess} />
            <CommentFail open={dialogStore.openCommentFail} />
        </>
    );
});

export { Comment };
