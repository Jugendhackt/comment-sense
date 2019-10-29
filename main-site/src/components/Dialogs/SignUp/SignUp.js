import React, { useState } from "react";
import { Dialog, useMediaQuery, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Box, makeStyles, Button } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import { langDe, ipAddress } from "../../../constants";



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
    margin: {
        margin: theme.spacing(1)
    }
}));

function SignUp(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openErr, setOpenErr] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const classes = useStyles();


    const sendData = () => {
        if (username && password) {
            fetch(`${ipAddress}/users/create/`, {
                method: "POST",
                body: JSON.stringify({
                    userName: username,
                    password: password,
                    email: (email) ? email : null
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        setOpenSuccess(true);
                    } else {
                        setOpenErr(true);
                    }
                })
                .catch(e => {
                    setOpenErr(true);
                })
        }
    };

    return (
        <>
            <Dialog open={props.open} onClose={props.onClose} fullScreen={fullScreen}>
                <DialogTitle>{langDe.signUp}</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>{langDe.signUpText}</DialogContentText>
                    <DialogActions>
                        <Box className={classes.box} >
                            <TextField label={langDe.username} value={username} fullWidth required className={classes.mb} onChange={evt => setUsername(evt.target.value)} />
                            <TextField label={langDe.password} value={password} fullWidth required className={classes.mb} onChange={evt => setPassword(evt.target.value)} type="password" />
                            <TextField label={langDe.email} value={email} fullWidth className={classes.mb} onChange={evt => setEmail(evt.target.value)} />
                            <Box className={classes.margin} >
                                <Button variant="contained" color="primary" className={classes.margin} onClick={sendData} >{langDe.signUp}</Button>
                                <Button variant="contained" color="secondary" className={classes.margin} onClick={props.onClose}>{langDe.cancel}</Button>
                            </Box>
                        </Box>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            <SignUpSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <SignUpErr open={openErr} onClose={() => setOpenErr(false)} />
        </>
    );
};

function SignUpSuccess(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const reload = () => {
        window.location.reload();
    };

    return (
        <Dialog open={props.open} onClose={props.onClose} fullScreen={fullScreen}>
            <DialogTitle>{langDe.signUpSuccessTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>{langDe.signUpSuccessText}</DialogContentText>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={reload}>{langDe.ok}</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

function SignUpErr(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Dialog open={props.open} onClose={props.onClose} fullScreen={fullScreen}>
            <DialogTitle>{langDe.signUpErrTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>{langDe.signUpErrText}</DialogContentText>
                <DialogActions>
                    <Button variant="contained" color="secondary" onClick={props.onClose}>{langDe.ok}</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

export { SignUp };