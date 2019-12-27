import React, {useContext} from "react";
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
import {langDe} from "../../constants";
import UserStoreContext from "../../stores/UserStore";
import DialogStoreContext from "../../stores/DialogStore";
import {getSignInRoute, setStorage} from "../../helpers";
import Alert from "./Alert";

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
    const userStore = useContext(UserStoreContext);
    const dialogStore = useContext(DialogStoreContext);
    const classes = useStyles();

    const sendData = () => {
        fetch(getSignInRoute({username: userStore.username, password: userStore.password}))
            .then(res => {
                if (res.status === 200) {
                    setStorage("username", userStore.username);
                    dialogStore.openSignInSuccess = true;
                    return res.json();
                } else {
                    dialogStore.openSignInFail = true;
                }
            })
            .then(res => {
                if (res.sid) {
                    userStore.sid = res.sid;
                    setStorage("sid", res.sid);
                }
            })
            .catch(e => {
                dialogStore.openSignInFail = true;
            });
    };

    return (
        <React.Fragment>
            <Dialog open={dialogStore.openSignIn} onClose={() => dialogStore.openSignIn = false} fullScreen={true}>
                <DialogTitle>{langDe.signIn}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{langDe.signInText}</DialogContentText>
                    <TextField label={langDe.username} value={userStore.username} fullWidth required
                               className={classes.mb} onChange={evt => userStore.username = evt.target.value}/>
                    <TextField label={langDe.password} value={userStore.password} fullWidth required
                               className={classes.mb} onChange={evt => userStore.password = evt.target.value}
                               type="password"/>
                </DialogContent>
                <DialogActions className={classes.center}>
                    <Button variant="contained" color="primary" onClick={sendData}>{langDe.signIn}</Button>
                    <Button variant="contained" color="secondary"
                            onClick={() => dialogStore.openSignIn = false}>{langDe.cancel}</Button>
                </DialogActions>
            </Dialog>
            <Alert open={dialogStore.openSignInSuccess} onClose={() => dialogStore.openSignInSuccess = false}
                   title={langDe.signInSuccessTitle} text={langDe.signInSuccessText}/>
            <Alert open={dialogStore.openSignInFail} onClose={() => dialogStore.openSignUpFail = false}
                   title={langDe.signUpErrTitle} text={langDe.signUpErrText}/>
        </React.Fragment>
    );
});

export default SignIn;