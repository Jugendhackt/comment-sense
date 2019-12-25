import React, {useContext} from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    Box,
    makeStyles,
    Button
} from "@material-ui/core";
import {observer} from "mobx-react-lite";
import {UserStoreContext} from "../../../stores/UserStore";
import {DialogStoreContext} from "../../../stores/DialogStore";
import {langDe, ipAddress} from "../../../constants";
import SignUpSuccess from "./SignUpSuccess";
import SignUpFail from "./SignUpFail";

const useStyles = makeStyles(theme => ({
    box: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        width: "100%"
    },
    mb: {
        marginBottom: theme.spacing(2)
    },
    center: {
        display: "flex",
        justifyContent: "center"
    }
}));

const SignUp = observer((props) => {
    const userStore = useContext(UserStoreContext);
    const dialogStore = useContext(DialogStoreContext);
    const classes = useStyles();


    const sendData = () => {
        if (userStore.username && userStore.password) {
            fetch(`${ipAddress}/api/signup/`, {
                method: "POST",
                body: JSON.stringify({
                    userName: userStore.username,
                    password: userStore.password
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        dialogStore.openSignUpSuccess = true;
                    } else {
                        dialogStore.openSignUpFail = true;
                    }
                })
                .catch((e) => {
                    dialogStore.openSignUpFail = true;
                });
        }
    };

    return (
        <>
            <Dialog open={dialogStore.openSignUp} onClose={() => dialogStore.openSignUp = false} fullScreen={true}>
                <DialogTitle>{langDe.signUp}</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>{langDe.signUpText}</DialogContentText>
                    <TextField label={langDe.username} value={userStore.username} fullWidth required
                               className={classes.mb} onChange={evt => userStore.username = evt.target.value}/>
                    <TextField label={langDe.password} value={userStore.password} fullWidth required
                               className={classes.mb} onChange={evt => userStore.password = evt.target.value}
                               type="password"/>
                    <TextField label={langDe.email} value={userStore.email} fullWidth className={classes.mb}
                               onChange={evt => userStore.email = evt.target.value}/>
                </DialogContent>
                <DialogActions className={classes.center}>
                    <Button variant="contained" color="primary" onClick={sendData}>{langDe.signUp}</Button>
                    <Button variant="contained" color="secondary"
                            onClick={() => dialogStore.openSignUp = false}>{langDe.cancel}</Button>
                </DialogActions>
            </Dialog>
            <SignUpSuccess/>
            <SignUpFail/>
        </>
    );
});

export default SignUp;