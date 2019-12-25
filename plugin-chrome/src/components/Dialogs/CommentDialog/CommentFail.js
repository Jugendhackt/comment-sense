import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from "@material-ui/core";
import {langDe} from "../../../constants";
import {DialogStoreContext} from "../../../stores/DialogStore";

const CommentFail = observer((props) => {
    const dialogStore = useContext(DialogStoreContext);

    return (
        <Dialog open={dialogStore.openCommentFail} onClose={() => dialogStore.openCommentFail = false}>
            <DialogTitle></DialogTitle>
            <DialogContent>
                <DialogContentText></DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="secondary"
                        onClick={() => dialogStore.openCommentFail = false}>{langDe.ok}</Button>
            </DialogActions>
        </Dialog>
    );
});

export default CommentFail;