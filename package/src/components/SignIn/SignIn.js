import React from "react";
import {observer} from "mobx-react-lite";
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
import {langDe} from "../../util/lang";
import {setStorage} from "../../util/helpers";
import {Alert} from "../Alert";
import {useStores} from "../../util/hooks";
import {signInRoute} from "../../util/routes";

const useStyles = makeStyles(theme => ({
    box: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        width: "100%"
    },
    center: {
        display: "flex",
        justifyContent: "center"
    },
    mb: {
        marginBottom: theme.spacing(2)
    }
}));


const SignIn = observer((props) => {
    const {userStore, dialogStore} = useStores();
    const classes = useStyles();

    const sendData = () => {
        fetch(signInRoute({username: userStore.username, password: userStore.password}))
            .then(res => {
                if (res.status === 200) {
                    setStorage("username", userStore.username);
                    dialogStore.handleSignInSuccess(true);
                    dialogStore.handleSignIn(false);
                    return res.json();
                } else {
                    dialogStore.handleSignInFail(true);
                    dialogStore.handleSignIn(false);
                }
            })
            .then(res => {
                if (res.sid) {
                    userStore.handleSid(res.sid);
                    setStorage("sid", res.sid);
                }
            })
            .catch(e => {
                dialogStore.handleSignInFail(true);
            });
    };

    return (
        <>
            <Dialog open={dialogStore.openSignIn} onClose={() => dialogStore.handleSignIn(false)} fullScreen={true}>
                <DialogTitle>{langDe.signIn}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{langDe.signInText}</DialogContentText>
                    <TextField label={langDe.username} value={userStore.username} fullWidth required
                               className={classes.mb} onChange={evt => userStore.handleUsername(evt.target.value)}/>
                    <TextField label={langDe.password} value={userStore.password} fullWidth required
                               className={classes.mb} onChange={evt => userStore.handlePassword(evt.target.value)}
                               type="password"/>
                </DialogContent>
                <DialogActions className={classes.center}>
                    <Button variant="contained" color="primary" onClick={sendData}>{langDe.signIn}</Button>
                    <Button variant="contained" color="secondary"
                            onClick={() => dialogStore.handleSignIn(false)}>{langDe.cancel}</Button>
                </DialogActions>
            </Dialog>
            <Alert open={dialogStore.openSignInSuccess} onClose={() => dialogStore.handleSignInSuccess(false)}
                   title={langDe.signInSuccessTitle} text={langDe.signInSuccessText}/>
            <Alert open={dialogStore.openSignInFail} onClose={() => dialogStore.handleSignInFail(false)}
                   title={langDe.signInErrTitle} text={langDe.signInErrTitle}/>
        </>
    );
});

export default SignIn;