import React, { useContext } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { DialogStoreContext } from "../../../stores/DialogStore";
import { langDe } from "../../../constants";

const SignUpFail = observer((props) => {
    const dialogStore = useContext(DialogStoreContext);

    return (
        <Dialog open={props.open} onClose={() => dialogStore.openSignUpFail = false} fullScreen={true}>
            <DialogTitle>{langDe.signUpErrTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>{langDe.signUpErrText}</DialogContentText>
                <DialogActions>
                    <Button variant="contained" color="secondary" onClick={() => dialogStore.openSignUpFail = false}>{langDe.ok}</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
});

export { SignUpFail };