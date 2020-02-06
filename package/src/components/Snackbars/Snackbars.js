import React from "react";
import {observer} from "mobx-react-lite";
import {useStores} from "../../util/hooks";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {langDe} from "../../util/lang";

const Snackbars = observer(() => {
    const {snackbarStore} = useStores();

    return (
        <>
            {/*signIn*/}
            <Snackbar open={snackbarStore.openSignInSuccess}
                      onClose={() => snackbarStore.openSignInSuccess = false}
                      autoHideDuration={5000}>
                <Alert severity="success" variant="filled"
                       onClose={() => snackbarStore.openSignInSuccess = false}>{langDe.signInSuccessText}</Alert>
            </Snackbar>
            <Snackbar open={snackbarStore.openSignInFail}
                      onClose={() => snackbarStore.openSignInFail = false}
                      autoHideDuration={5000}>
                <Alert severity="error" variant="filled"
                       onClose={() => snackbarStore.openSignInFail = false}>{langDe.signInErrText}</Alert>
            </Snackbar>
            {/*signUp*/}
            <Snackbar open={snackbarStore.openSignUpSuccess}
                      onClose={() => snackbarStore.openSignUpSuccess = false}
                      autoHideDuration={5000}>
                <Alert severity="success" variant="filled"
                       onClose={() => snackbarStore.openSignUpSuccess = false}>{langDe.signUpSuccessText}</Alert>
            </Snackbar>
            <Snackbar open={snackbarStore.openSignUpTaken}
                      onClose={() => snackbarStore.openSignUpTaken = false}
                      autoHideDuration={5000}>
                <Alert severity="warning" variant="filled"
                       onClose={() => snackbarStore.openSignUpTaken = false}>{langDe.signUpErrText403}</Alert>
            </Snackbar>
            <Snackbar open={snackbarStore.openSignUpFail}
                      onClose={() => snackbarStore.openSignUpFail = false}
                      autoHideDuration={5000}>
                <Alert severity="error" variant="filled"
                       onClose={() => snackbarStore.openSignUpFail = false}>{langDe.signUpErrText500}</Alert>
            </Snackbar>
            <Snackbar open={snackbarStore.openSignUpPasswordUnequal}
                      onClose={() => snackbarStore.openSignUpPasswordUnequal = false}
                      autoHideDuration={5000}>
                <Alert severity="error" variant="filled"
                       onClose={() => snackbarStore.openSignUpPasswordUnequal = false}>{langDe.signUpPasswordUnequal}</Alert>
            </Snackbar>
            {/*signOut*/}
            <Snackbar open={snackbarStore.openSignOutSuccess}
                      onClose={() => snackbarStore.openSignOutSuccess = false}
                      autoHideDuration={5000}>
                <Alert severity="success" variant="filled"
                       onClose={() => snackbarStore.openSignOutSuccess = false}>{langDe.signOutSuccessText}</Alert>
            </Snackbar>
            <Snackbar open={snackbarStore.openSignOutFail}
                      onClose={() => snackbarStore.openSignOutFail = false}
                      autoHideDuration={5000}>
                <Alert severity="error" variant="filled"
                       onClose={() => snackbarStore.openSignOutFail = false}>{langDe.signOutFailText}</Alert>
            </Snackbar>
            {/*voteComment*/}
            <Snackbar open={snackbarStore.openVoteSuccess} onClose={() => snackbarStore.openVoteSuccess = false}
                      autoHideDuration={5000}>
                <Alert severity="success" variant="filled"
                       onClose={() => snackbarStore.openVoteSuccess = false}>{langDe.voteCommentSuccess}</Alert>
            </Snackbar>
            <Snackbar open={snackbarStore.openUnVoteSuccess} onClose={() => snackbarStore.openUnVoteSuccess = false}
                      autoHideDuration={5000}>
                <Alert severity="success" variant="filled"
                       onClose={() => snackbarStore.openUnVoteSuccess = false}>{langDe.unvoteCommentSuccess}</Alert>
            </Snackbar>
            <Snackbar open={snackbarStore.openVoteFail} onClose={() => snackbarStore.openVoteFail = false}
                      autoHideDuration={5000}>
                <Alert severity="error" variant="filled"
                       onClose={() => snackbarStore.openVoteFail = false}>{langDe.voteCommentFail}</Alert>
            </Snackbar>
            {/*changeUserData*/}
            <Snackbar open={snackbarStore.openChangeUserDataSuccess} onClose={() => snackbarStore.openChangeUserDataSuccess = false}
                      autoHideDuration={5000}>
                <Alert severity="success" variant="filled"
                       onClose={() => snackbarStore.openChangeUserDataSuccess = false}>{langDe.changeUserDataSuccess}</Alert>
            </Snackbar>
            <Snackbar open={snackbarStore.openChangeUserDataFail} onClose={() => snackbarStore.openChangeUserDataFail = false}
                      autoHideDuration={5000}>
                <Alert severity="error" variant="filled"
                       onClose={() => snackbarStore.openChangeUserDataFail = false}>{langDe.changeUserDataFail}</Alert>
            </Snackbar>
        </>
    );
});

export default Snackbars;