import React, { useContext } from "react";
import { useTheme, useMediaQuery, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { DialogStoreContext } from "../../../stores/DialogStore";
import { langDe } from "../../../constants";

const SignUpFail = observer((props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const dialogStore = useContext(DialogStoreContext);

    return (
        <Dialog open={props.open} onClose={() => dialogStore.openSignUpFail = false} fullScreen={fullScreen}>
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