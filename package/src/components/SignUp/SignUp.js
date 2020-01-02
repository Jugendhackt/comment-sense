import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    TextField
} from "@material-ui/core";
import {observer} from "mobx-react-lite";
import {langDe} from "../../util/lang";
import {Alert} from "../Alert";
import {signUpRoute} from "../../util/routes";
import {useStores} from "../../util/hooks";

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
    const {userStore, dialogStore} = useStores();
    const classes = useStyles();

    const sendData = () => {
        if (userStore.username && userStore.password) {
            fetch(signUpRoute(), {
                method: "POST",
                header: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: userStore.username,
                    password: userStore.password
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        dialogStore.handleSignUpSuccess(true);
                        dialogStore.handleSignUp(false);
                    } else {
                        dialogStore.handleSignUpFail(true);
                        dialogStore.handleSignUp(false);
                    }
                })
                .catch(e => {
                    dialogStore.handleSignUpFail(true);
                });
        }
    };

    return (
        <React.Fragment>
            <Dialog open={dialogStore.openSignUp} onClose={() => dialogStore.handleSignUp(false)} fullScreen={true}>
                <DialogTitle>{langDe.signUp}</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>{langDe.signUpText}</DialogContentText>
                    <TextField label={langDe.username} value={userStore.username} fullWidth required
                               className={classes.mb} onChange={evt => userStore.handleUsername(evt.target.value)}/>
                    <TextField label={langDe.password} value={userStore.password} fullWidth required
                               className={classes.mb} onChange={evt => userStore.handlePassword(evt.target.value)}
                               type="password"/>
                </DialogContent>
                <DialogActions className={classes.center}>
                    <Button variant="contained" color="primary" onClick={sendData}>{langDe.signUp}</Button>
                    <Button variant="contained" color="secondary"
                            onClick={() => dialogStore.handleSignUp(false)}>{langDe.cancel}</Button>
                </DialogActions>
            </Dialog>
            <Alert open={dialogStore.openSignUpSuccess} onClose={() => dialogStore.handleSignUpSuccess(false)}
                   title={langDe.signUpSuccessTitle} text={langDe.signUpSuccessText}/>
            <Alert open={dialogStore.openSignUpFail} onClose={() => dialogStore.handleSignUpFail(false)}
                   title={langDe.signUpErrTitle} text={langDe.signUpErrText}/>
        </React.Fragment>
    );
});

export default SignUp;