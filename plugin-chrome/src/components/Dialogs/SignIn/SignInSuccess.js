import React, {useContext} from "react";
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from "@material-ui/core";
import {observer} from "mobx-react-lite";
import {DialogStoreContext} from "../../../stores/DialogStore";
import {langDe} from "../../../constants";

const SignInSuccess = observer((props) => {
    const dialogStore = useContext(DialogStoreContext);

    return (
        <Dialog open={dialogStore.openSignInSuccess} onClose={() => dialogStore.openSignInSuccess = false}
                fullScreen={true}>
            <DialogTitle>{langDe.signInSuccessTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>{langDe.signInSuccessText}</DialogContentText>
                <DialogActions>
                    <Button variant="contained" color="primary"
                            onClick={() => window.location.reload()}>{langDe.ok}</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
});

export default SignInSuccess;