import {action, observable} from "mobx";

export class SnackbarStore {
    @observable openSignInSuccess = false;
    @observable openSignInFail = false;

    @observable openSignUpSuccess = false;
    @observable openSignUpTaken = false;
    @observable openSignUpPasswordUnequal = false;
    @observable openSignUpFail = false;

    @observable openSignOutSuccess = false;
    @observable openSignOutFail = false;

    @observable openCommentSuccess = false;
    @observable openCommentFail = false;

    @observable openVoteSuccess = false;
    @observable openVoteFail = false;

    @observable openChangeUserDataSuccess = false;
    @observable openChangeUserDataFail = false;

    @action reset() {
        this.openSignInSuccess = false;
        this.openSignInFail = false;

        this.openSignUpSuccess = false;
        this.openSignUpTaken = false;
        this.openSignUpPasswordUnequal = false;
        this.openSignUpFail = false;

        this.openSignOutSuccess = false;
        this.openSignOutFail = false;

        this.openCommentSuccess = false;
        this.openCommentFail = false;

        this.openChangeUserDataSuccess = false;
        this.openChangeUserDataFail = false;
    }
}

export default SnackbarStore;