import React from "react";
import {observer} from "mobx-react-lite";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    useMediaQuery,
    useTheme
} from "@material-ui/core";
import {langDe} from "../../util/lang";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
});

const Alert = observer((props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const {open, onClose, title, text} = props;

    return (
        <Dialog open={open} onClose={onClose} fullScreen={fullScreen}
                TransitionComponent={Transition}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="secondary" onClick={onClose}>{langDe.cancel}</Button>
            </DialogActions>
        </Dialog>
    );
});

export default Alert;