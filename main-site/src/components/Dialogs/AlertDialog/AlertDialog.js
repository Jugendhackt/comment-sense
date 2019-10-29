import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import { langDe } from "../../../constants";

function AlertDialog(props) {
    const [open, setOpen] = useState(true);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Dialog open={open} onClose={() => setOpen(false)} fullScreen={fullScreen} >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{props.text}</DialogContentText>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={() => setOpen(false)}>{langDe.ok}</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
};

export { AlertDialog };