import React, { useContext } from "react";
import { useTheme, useMediaQuery, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { DialogStoreContext } from "../../../stores/DialogStore";
import { langDe } from "../../../constants";

const SignUpSuccess = observer((props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const dialogStore = useContext(DialogStoreContext);

    const reload = () => {
        window.location.reload();
    };

    return (
        <Dialog open={props.open} onClose={() => dialogStore.openSignUpSuccess = false} fullScreen={fullScreen}>
            <DialogTitle>{langDe.signUpSuccessTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>{langDe.signUpSuccessText}</DialogContentText>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={reload}>{langDe.ok}</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
});

export { SignUpSuccess };