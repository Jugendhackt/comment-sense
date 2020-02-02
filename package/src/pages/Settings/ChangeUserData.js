import React from "react";
import {observer} from "mobx-react-lite";
import {useChangeUserData, useStores} from "../../util/hooks";
import {
    Button,
    ExpansionPanel,
    ExpansionPanelActions,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import {langDe} from "../../util/lang";

const useStyles = makeStyles(theme => ({
    textField: {
        margin: theme.spacing(1)
    },
    div: {
        width: "100%",
        padding: theme.spacing(2),
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
    },
    button: {
        margin: theme.spacing(2),
        width: "20%",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            marginLeft: theme.spacing(0)
        }
    }
}));

export const ChangeUserData = observer(() => {
    const {userStore, dialogStore, snackbarStore} = useStores();
    const classes = useStyles();

    const sendData = async () => {
        const response = await useChangeUserData(userStore.username, userStore.password, userStore.newPassword, userStore.email);
        if (response) {
            snackbarStore.openChangeUserDataSuccess = true;
        } else {
            snackbarStore.openChangeUserDataFail = true;
        }
    };

    return (
        <ExpansionPanel expanded={dialogStore.openChangeUser} onChange={() => dialogStore.openChangeUser = !dialogStore.openChangeUser}>
            <ExpansionPanelSummary>
                <Typography variant="body1">{langDe.account}</Typography>
            </ExpansionPanelSummary>
            < ExpansionPanelDetails>
                <Typography variant="body2">{langDe.accountText}</Typography>
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
                <div className={classes.div}>
                    <TextField label={langDe.username} className={classes.textField} value={userStore.username}
                               onChange={evt => userStore.username = evt.target.value}/>
                    <TextField label={langDe.oldPassword} className={classes.textField} value={userStore.password}
                               onChange={evt => userStore.password = evt.target.value} type="password"/>
                    <TextField label={langDe.newPassword} className={classes.textField} value={userStore.newPassword}
                               onChange={evt => userStore.newPassword = evt.target.value} type="password"/>
                    <TextField label={langDe.email} className={classes.textField} value={userStore.email}
                               onChange={evt => userStore.email = evt.target.value}/>
                    <Button variant="contained" color="primary" onClick={sendData}
                            className={classes.button}>{langDe.saveChanges}</Button>
                </div>
            </ExpansionPanelActions>
        </ExpansionPanel>
    );
});