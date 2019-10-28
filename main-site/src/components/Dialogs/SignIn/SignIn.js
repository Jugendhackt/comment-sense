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
    margin: {
        margin: theme.spacing(1)
    },
    mb: {
        marginBottom: theme.spacing(2)
    }
}));


function SignIn(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));


    const sendData = () => {
        fetch(`${ipAddress}/users/login/`, {
            method: "POST",
            body: JSON.stringify({
                userName: username,
                password: password
            })
        })
            .then(res => {
                if (res.ok)
                    return res.json();
            })
            .then(res => {
                console.log(res);
                if (res.status === "login data valid") {
                  console.log("success");  
                }
            })
    };

    return (
        <Dialog open={props.open} onClose={props.onClose} fullScreen={fullScreen}>
            <DialogTitle>{langDe.signIn}</DialogTitle>
            <DialogContent>
                <DialogContentText>{langDe.signInText}</DialogContentText>
                <DialogActions>
                    <Box className={classes.box}>
                        <TextField label={langDe.username} value={username} fullWidth required className={classes.mb} onChange={evt => setUsername(evt.target.value)} />
                        <TextField label={langDe.password} value={password} fullWidth required className={classes.mb} onChange={evt => setPassword(evt.target.value)} type="password" />
                        <Box className={classes.margin}>
                            <Button variant="contained" color="primary" className={classes.margin} onClick={sendData} >{langDe.signIn}</Button>
                            <Button variant="contained" color="secondary" className={classes.margin} onClick={props.onClose} >{langDe.cancel}</Button>
                        </Box>
                    </Box>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

export { SignIn };