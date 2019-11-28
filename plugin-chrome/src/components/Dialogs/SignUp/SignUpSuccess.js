import React, { useContext } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { DialogStoreContext } from "../../../stores/DialogStore";
import { langDe } from "../../../constants";

const SignUpSuccess = observer((props) => {
    const dialogStore = useContext(DialogStoreContext);

    return (
        <Dialog open={props.open} onClose={() => dialogStore.openSignUpSuccess = false} fullScreen={true}>
            <DialogTitle>{langDe.signUpSuccessTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>{langDe.signUpSuccessText}</DialogContentText>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={() => window.location.reload()}>{langDe.ok}</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
});

export { SignUpSuccess };