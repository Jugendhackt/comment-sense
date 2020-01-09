import React from "react";
import {useHistory} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Box, Button, makeStyles, Paper, TextField} from "@material-ui/core";
import {useStores} from "package/util/hooks";
import {langDe} from "package/util/lang";
import {changeUserRoute} from "package/util/routes";

const useStyles = makeStyles(theme => ({
    paper: {
        width: "100%",
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
        justifyContent: "center",
        width: "100%",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column"
        }
    },
    button: {
        margin: theme.spacing(2)
    }
}));

export const Account = observer(() => {
    const {userStore} = useStores();

    const classes = useStyles();
    let history = useHistory();

    const sendData = () => {
        fetch(changeUserRoute(), {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: userStore.username,
                password: userStore.password,
                email: userStore.email,
                "new password": ""
            })
        }).then(res => {
            console.log(res.status);
        });
    };

    const home = () => {
        history.push("/");
    };

    return (
        <div className={classes.div}>
            <Paper className={classes.paper}>
                <Box className={classes.box}>
                    <TextField label={langDe.username} className={classes.textField} value={userStore.username}
                               onChange={evt => userStore.username = evt.target.value}/>
                    <TextField label={langDe.password} className={classes.textField} value={userStore.password}
                               onChange={evt => userStore.password = evt.target.value} type="password"/>
                    <TextField label={langDe.email} className={classes.textField} value={userStore.email}
                               onChange={evt => userStore.email = evt.target.value}/>
                    <Box className={classes.buttonBox}>
                        <Button variant="contained" color="primary" onClick={sendData}
                                className={classes.button}>{langDe.saveChanges}</Button>
                        <Button variant="contained" color="secondary" onClick={home}
                                className={classes.button}>{langDe.cancel}</Button>
                    </Box>
                </Box>
            </Paper>
        </div>
    );
});

export default Account;