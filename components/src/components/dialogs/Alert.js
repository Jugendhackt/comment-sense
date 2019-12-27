import React from "react";
import {observer} from "mobx-react-lite";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    useTheme,
    useMediaQuery,
    Slide,
    Button
} from "@material-ui/core";
import {langDe} from "../../constants";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
});

const Alert = observer((props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Dialog open={props.open} onClose={props.onClose} fullScreen={fullScreen}
                TransitionComponent={Transition}>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{props.text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={props.onClose}>{langDe.cancel}</Button>
            </DialogActions>
        </Dialog>
    );
});

export default Alert;