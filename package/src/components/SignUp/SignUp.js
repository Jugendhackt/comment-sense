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
import {useFullscreen, useSignIn, useSignUp, useStores} from "../../util/hooks";

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

    const sendData = async () => {
        if (userStore.username && userStore.password && userStore.repeatPassword) {
            if (userStore.password === userStore.repeatPassword) {
                const response = await useSignUp(userStore.username, userStore.password, userStore.email);
                if (response) {
                    const sid = await useSignIn(userStore.username, userStore.password);
                    if (sid) {
                        userStore.signIn(sid, userStore.username);
                        dialogStore.closeSignUp();
                        snackbarStore.openSignUpSuccess = true;
                    }
                } else {
                    snackbarStore.openSignUpFail = true;
                }
            } else if (userStore.password !== userStore.repeatPassword) {
                snackbarStore.openSignUpPasswordUnequal = true;
            }
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
                        <TextField label={langDe.repeatPassword} value={userStore.repeatPassword} fullWidth required
                                   name="repeatPassword" autoComplete="new-password"
                                   className={classes.mb} onChange={evt => userStore.repeatPassword = evt.target.value}
                                   type="password"/>
                        <TextField label={langDe.email} value={userStore.email} fullWidth name="email"
                                   autoComplete="email" className={classes.mb}
                                   onChange={evt => userStore.email = evt.target.value}/>
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