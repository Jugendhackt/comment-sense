import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Box, makeStyles, Button } from "@material-ui/core";
import { langDe, ipAddress } from "../../../constants";
import { UserStoreContext } from "../../../stores/UserStore";
import { DialogStoreContext } from "../../../stores/DialogStore";
import { SignInFail } from "./SignInFail";
import { SignInSuccess } from "./SignInSuccess";
import { setStorage } from "../../../helpers";

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
        fetch(`${ipAddress}/api/signin?name='${userStore.username}'&password='${userStore.password}'`)
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
                    console.log(res.sid);
                    userStore.sid = res.sid;
                    setStorage("sid", res.sid);
                }
            })
            .catch((e) => {
                dialogStore.openSignInFail = true;
            });
    };

    return (
        <>
            <Dialog open={props.open} onClose={() => dialogStore.openSignIn = false} fullScreen={true}>
                <DialogTitle>{langDe.signIn}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{langDe.signInText}</DialogContentText>
                    <TextField label={langDe.username} value={userStore.username} fullWidth required className={classes.mb} onChange={evt => userStore.username = evt.target.value} />
                    <TextField label={langDe.password} value={userStore.password} fullWidth required className={classes.mb} onChange={evt => userStore.password = evt.target.value} type="password" />
                </DialogContent>
                <DialogActions className={classes.center} >
                    <Button variant="contained" color="primary" onClick={sendData} >{langDe.signIn}</Button>
                    <Button variant="contained" color="secondary" onClick={() => dialogStore.openSignIn = false} >{langDe.cancel}</Button>
                </DialogActions>
            </Dialog>
            <SignInSuccess open={dialogStore.openSignInSuccess} />
            <SignInFail open={dialogStore.openSignInFail} />
        </>
    );
});

export { SignIn };