import React, { useState } from "react";
import { Dialog, useMediaQuery, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Box, makeStyles, Button } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import { langDe, ipAddress } from "../../../constants";
import { AlertDialog } from "../AlertDialog/";

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
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
                    if (res.ok)
                        return res.json()
                })
                .then(res => {
                    console.log(res);
                    if (res.status === "user created") {

                    }
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
        </>
    );
};

export { SignUp };