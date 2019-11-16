import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Dialog, useMediaQuery, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Box, makeStyles, Button } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import { langDe, ipAddress } from "../../../constants";
import { UserStoreContext } from "../../../stores/UserStore";
import { DialogStoreContext } from "../../../stores/DialogStore";
import { saveUsername } from "../../../helpers";

const useStyles = makeStyles(theme => ({
    box: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        width: "100%"
    },
    margin: {
        margin: theme.spacing(1)
    },
    mb: {
        marginBottom: theme.spacing(2)
    }
}));


const SignIn = observer((props) => {
    const userStore = useContext(UserStoreContext);
    const dialogStore = useContext(DialogStoreContext);

    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));


    const sendData = () => {
        fetch(`${ipAddress}/api/signin?name='${userStore.username}'&password='${userStore.password}'`)
            .then(res => {
                if (res.status === 200) {
                    dialogStore.openSignInSuccess = true;
                    saveUsername(userStore.username);
                } else {
                    dialogStore.openSignInFail = true;
                }
            })
            .catch(e => {
                dialogStore.openSignInFail = true;
            })
    };

    return (
        <>
            <Dialog open={props.open} onClose={props.onClose} fullScreen={fullScreen}>
                <DialogTitle>{langDe.signIn}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{langDe.signInText}</DialogContentText>
                    <DialogActions>
                        <Box className={classes.box}>
                            <TextField label={langDe.username} value={userStore.username} fullWidth required className={classes.mb} onChange={evt => userStore.username = evt.target.value} />
                            <TextField label={langDe.password} value={userStore.password} fullWidth required className={classes.mb} onChange={evt => userStore.password = evt.target.value} type="password" />
                            <Box className={classes.margin}>
                                <Button variant="contained" color="primary" className={classes.margin} onClick={sendData} >{langDe.signIn}</Button>
                                <Button variant="contained" color="secondary" className={classes.margin} onClick={props.onClose} >{langDe.cancel}</Button>
                            </Box>
                        </Box>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            <SignInSuccess open={dialogStore.openSignInSuccess} onClose={() => dialogStore.openSignInSuccess = false} />
            <SignInErr open={dialogStore.openSignInFail} onClose={() => dialogStore.openSignInFail = false} />
        </>
    );
});

function SignInSuccess(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const reload = () => {
        window.location.reload();
    };

    return (
        <Dialog open={props.open} onClose={props.onClose} fullScreen={fullScreen}>
            <DialogTitle>{langDe.signInSuccessTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>{langDe.signInSuccessText}</DialogContentText>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={reload}>{langDe.ok}</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

function SignInErr(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Dialog open={props.open} onClose={props.onClose} fullScreen={fullScreen}>
            <DialogTitle>{langDe.signInErrTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>{langDe.signInErrText}</DialogContentText>
                <DialogActions>
                    <Button variant="contained" color="secondary" onClick={props.onClose}>{langDe.ok}</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

export { SignIn };