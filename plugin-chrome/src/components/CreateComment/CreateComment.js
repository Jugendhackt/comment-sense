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
import React from "react";
import {langDe} from "../../util/lang";
import {makeStyles} from "@material-ui/styles";
import {getCurrentTab} from "../../util/helpers";
import {Alert} from "../Alert";
import {createCommentRoute} from "../../util/routes";
import {useStores} from "../../util/hooks";

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
    const classes = useStyles();
    const {userStore, dialogStore} = useStores();

    const sendComment = () => {
        getCurrentTab().then(url => {
            console.log(url, "hi");
            fetch(createCommentRoute(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    sid: userStore.sid,
                    url: url,
                    headline: userStore.title,
                    content: userStore.comment,
                    username: userStore.username
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        dialogStore.handleCommentSuccess(true);
                    } else {
                        dialogStore.handleCommentFail(true);
                    }
                })
                .catch(e => {
                    dialogStore.handleCommentFail(true);
                })
        });
    };

    return (
        <>
            <Dialog open={dialogStore.openComment} onClose={() => dialogStore.handleComment(false)} fullScreen={true}>
                <DialogTitle>{langDe.addComment}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{langDe.addCommentText}</DialogContentText>
                    <TextField autoFocus={true} fullWidth placeholder={langDe.commentTitle} size="medium"
                               className={classes.textField} onChange={(evt) => userStore.handleTitle(evt.target.value)}/>
                    <TextField fullWidth multiline={true} placeholder={langDe.commentText} size="medium" rows={6}
                               className={classes.textField} onChange={(evt) => userStore.handleComment(evt.target.value)}/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={sendComment}>{langDe.commentSend}</Button>
                    <Button variant="contained" color="secondary"
                            onClick={() => dialogStore.handleComment(false)}>{langDe.cancel}</Button>
                </DialogActions>
            </Dialog>
            <Alert open={dialogStore.openCommentSuccess} onClose={() => dialogStore.handleCommentSuccess(false)}
                   title={langDe.commentSuccessTitle} text={langDe.commentSuccessText}/>
            <Alert open={dialogStore.openCommentFail} onClose={() => dialogStore.handleCommentFail(false)}
                   title={langDe.commentFailTitle} text={langDe.commentFailText}/>
        </>
    );
});

export default CreateComment;
