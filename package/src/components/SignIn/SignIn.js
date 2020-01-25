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
import {useFullscreen, useSetStorage, useStores} from "../../util/hooks";
import {Routes} from "../../util/routes";

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


const SignIn = observer(() => {
    const {userStore, dialogStore, snackbarStore} = useStores();
    const fullscreen = useFullscreen("sm");
    const classes = useStyles();

    const handleOnClose = () => {
        dialogStore.openSignIn = false;
        userStore.clearInput();
    };

    const sendData = () => {
        if (userStore.username && userStore.password) {
            let status;
            fetch(Routes.signIn({username: userStore.username, password: userStore.password}))
                .then(res => {
                    status = res.status;
                    if (res.status === 200) {
                        return res.json();
                    }
                })
                .then(res => {
                    if (res.sid && status === 200) {
                        useSetStorage(["username", "sid"], [userStore.username, res.sid]);
                        userStore.signIn({username: userStore.username, sid: res.sid});
                        dialogStore.closeSignIn();
                        snackbarStore.openSignInSuccess = true;
                    }
                })
                .catch(e => {
                    snackbarStore.openSignInFail = true;
                })
        }
    };

    return (
        <>
            <Dialog open={dialogStore.openSignIn} onClose={handleOnClose}
                    fullScreen={fullscreen}>
                <DialogTitle>{langDe.signIn}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{langDe.signInText}</DialogContentText>
                    <form>
                        <TextField label={langDe.username} value={userStore.username} fullWidth required name="username"
                                   autoComplete="username"
                                   className={classes.mb} onChange={evt => userStore.username = evt.target.value}/>
                        <TextField label={langDe.password} value={userStore.password} fullWidth required name="password"
                                   autoComplete="password"
                                   className={classes.mb} onChange={evt => userStore.password = evt.target.value}
                                   type="password"/>
                    </form>
                </DialogContent>
                <DialogActions className={classes.center}>
                    <Button variant="contained" color="primary" onClick={sendData}>{langDe.signIn}</Button>
                    <Button variant="contained" color="secondary"
                            onClick={handleOnClose}>{langDe.cancel}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
});

export default SignIn;