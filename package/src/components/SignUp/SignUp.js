import React, {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    TextField,
    Typography,
    Box
} from "@material-ui/core";
import {observer} from "mobx-react-lite";
import {langDe} from "../../util/lang";
import {signUpRoute} from "../../util/routes";
import {useFullscreen, useStores, useTimeout} from "../../util/hooks";

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
    const [status, setStatus] = useState("");
    const {userStore, dialogStore} = useStores();
    const fullscreen = useFullscreen("sm");
    const classes = useStyles();

    const handleOnClose = () => {
        dialogStore.handleSignUp(false);
        userStore.reset();
    };

    const handleOnChange = (evt) => {
        if (evt.target.name === "username") {
            userStore.handleUsername(evt.target.value);
        } else if (evt.target.name === "password") {
            userStore.handlePassword(evt.target.value);
        }
    };

    const sendData = () => {
        const closeDialog = () => {
            dialogStore.handleSignUp(false);
            window.location.reload();
        };

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
                        setStatus(langDe.signUpSuccessText);
                    } else if (res.status === 403) {
                        setStatus(langDe.signUpErrText403);
                    }
                    useTimeout(2000, closeDialog);
                })
                .catch(e => {
                    setStatus(langDe.signUpErrText500);
                });
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
                                   className={classes.mb} onChange={handleOnChange}/>
                        <TextField label={langDe.password} value={userStore.password} fullWidth required name="password"
                                   autoComplete="new-password"
                                   className={classes.mb} onChange={handleOnChange}
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