import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";
import { DialogStoreContext } from "../../../stores/DialogStore";
import { langDe } from "../../../constants";

const SignInFail = observer((props) => {
    const dialogStore = useContext(DialogStoreContext);

    return (
        <Dialog open={props.open} onClose={() => dialogStore.openSignInFail = false} fullScreen={true}>
            <DialogTitle>{langDe.signInErrTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>{langDe.signInErrText}</DialogContentText>
                <DialogActions>
                    <Button variant="contained" color="secondary" onClick={() => dialogStore.openSignInFail = false}>{langDe.ok}</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
});

export { SignInFail };
