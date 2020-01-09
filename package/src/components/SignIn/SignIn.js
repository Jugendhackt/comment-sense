import React, {useState} from "react";
import {observer} from "mobx-react-lite";
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
import {langDe} from "../../util/lang";
import {useSetStorage, useStores, useTimeout} from "../../util/hooks";
import {signInRoute} from "../../util/routes";
import useFullscreen from "../../util/hooks/use-fullscreen";

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
    const [status, setStatus] = useState("");
    const {userStore, dialogStore} = useStores();
    const fullscreen = useFullscreen("sm");
    const classes = useStyles();

    const handleOnClose = () => {
        dialogStore.handleSignIn(false);
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
            dialogStore.handleSignIn(false);
            window.location.reload();
        };

        fetch(signInRoute({username: userStore.username, password: userStore.password}))
            .then(res => {
                if (res.status === 200) {
                    useSetStorage("username", userStore.username);
                    setStatus(langDe.signInSuccessText);
                    return res.json();
                } else {
                    setStatus(langDe.signInErrText);
                }
            })
            .then(res => {
                if (res.sid) {
                    userStore.handleSid(res.sid);
                    useSetStorage("sid", res.sid);
                    useTimeout(2000, closeDialog);
                }
            })
            .catch(() => {
                setStatus(langDe.signInErrText);
            });
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
                                   className={classes.mb} onChange={handleOnChange}/>
                        <TextField label={langDe.password} value={userStore.password} fullWidth required name="password"
                                   autoComplete="password"
                                   className={classes.mb} onChange={handleOnChange}
                                   type="password"/>
                    </form>
                    <Typography variant="body1" component="div">
                        <Box textAlign="center">
                            {status}
                        </Box>
                    </Typography>
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