import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField, makeStyles, Box, Paper, Button } from "@material-ui/core";
import { langDe } from "../constants";

const useStyles = makeStyles(theme => ({
    paper: {
        width: "50%",
        padding: theme.spacing(2)
    },
    textField: {
        width: "90%",
        margin: theme.spacing(1)
    },
    div: {
        display: "flex",
        justifyContent: "center"
    },
    box: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
    },
    buttonBox: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%"
    }
}));

function Account(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const classes = useStyles();
    let history = useHistory();

    const sendData = () => {

    };

    const home = () => {
        history.push("/");
    };

    return (
        <div className={classes.div} >
            <Paper className={classes.paper}>
                <Box className={classes.box}>
                    <TextField label={langDe.username} className={classes.textField} value={username} onChange={evt => setUsername(evt.target.value)} />
                    <TextField label={langDe.password} className={classes.textField} value={password} onChange={evt => setPassword(evt.target.value)} type="password" />
                    <TextField label={langDe.email} className={classes.textField} value={email} onChange={evt => setEmail(evt.target.value)} />
                    <Box className={classes.buttonBox}>
                        <Button variant="contained" color="primary" onClick={sendData}>{langDe.saveChanges}</Button>
                        <Button variant="contained" color="secondary" onClick={home}>{langDe.cancel}</Button>
                    </Box>
                </Box>
            </Paper>
        </div>
    );
};

export { Account };