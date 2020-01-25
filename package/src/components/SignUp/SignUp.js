import React from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import {observer} from "mobx-react-lite";
import {langDe} from "../../util/lang";
import {Routes} from "../../util/routes";
import {useFullscreen, useStores} from "../../util/hooks";

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

const SignUp = observer(() => {
    const {userStore, dialogStore, snackbarStore} = useStores();
    const fullscreen = useFullscreen("sm");
    const classes = useStyles();

    const handleOnClose = () => {
        dialogStore.openSignUp = false;
        userStore.reset();
    };

    const sendData = () => {
        const signIn = () => {
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
                        userStore.signIn({username: userStore.username, sid: res.sid});
                        dialogStore.closeSignUp();
                        snackbarStore.openSignUpSuccess = true;
                    }
                })
                .catch(e => {
                    snackbarStore.openSignInFail = true;
                })
        };

        if (userStore.username && userStore.password) {
            fetch(Routes.signUp(), {
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
                        signIn();
                    } else if (res.status === 403) {
                        snackbarStore.openSignUpTaken = true;
                    }
                })
                .catch(e => {
                    snackbarStore.openSignUpFail = true;
                })
        }
    };

    return (
        <>
            <Dialog open={dialogStore.openSignUp} onClose={handleOnClose}
                    fullScreen={fullscreen}>
                <DialogTitle>{langDe.signUp}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{langDe.signUpText}</DialogContentText>
                    <form>
                        <TextField label={langDe.username} value={userStore.username} fullWidth required name="username"
                                   autoComplete="username"
                                   className={classes.mb} onChange={evt => userStore.username = evt.target.value}/>
                        <TextField label={langDe.password} value={userStore.password} fullWidth required name="password"
                                   autoComplete="new-password"
                                   className={classes.mb} onChange={evt => userStore.password = evt.target.value}
                                   type="password"/>
                    </form>
                    <Typography component="div" variant="body1">
                        <Box textAlign="center">{status}</Box>
                    </Typography>
                </DialogContent>
                <DialogActions className={classes.center}>
                    <Button variant="contained" color="primary" onClick={sendData}>{langDe.signUp}</Button>
                    <Button variant="contained" color="secondary"
                            onClick={handleOnClose}>{langDe.cancel}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
});

export default SignUp;