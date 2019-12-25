import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from "@material-ui/core";
import {langDe} from "../../../constants";
import {DialogStoreContext} from "../../../stores/DialogStore";

const CommentSuccess = observer((props) => {
    const dialogStore = useContext(DialogStoreContext);

    return (
        <Dialog open={dialogStore.openCommentSuccess} onClose={() => dialogStore.openCommentSuccess = false}>
            <DialogTitle>{langDe.commentSuccessTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>{langDe.commentSuccessText}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary"
                        onClick={() => dialogStore.openCommentSuccess = false}>{langDe.ok}</Button>
            </DialogActions>
        </Dialog>
    );
});

export default CommentSuccess;