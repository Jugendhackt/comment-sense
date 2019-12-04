import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";
import { langDe } from "../../../helpers";
import { DialogStoreContext } from "../../../stores/DialogStore";

const CommentFail = observer((props) => {
    const dialogStore = useContext(DialogStoreContext);

    return (
        <Dialog open={props.open} onClose={() => dialogStore.openCommentFail = false}>
            <DialogTitle></DialogTitle>
            <DialogContent>
                <DialogContentText></DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="conained" color="secondary" onClick={() => dialogStore.openCommentFail = false}>{langDe.ok}</Button>
            </DialogActions>
        </Dialog>
    );
});

export { CommentFail };