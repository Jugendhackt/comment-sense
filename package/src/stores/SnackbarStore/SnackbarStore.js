import {action, observable} from "mobx";

export class SnackbarStore {
    @observable openSignInSuccess = false;
    @observable openSignInFail = false;

    @observable openSignUpSuccess = false;
    @observable openSignUpTaken = false;
    @observable openSignUpFail = false;

    @observable openSignOutSuccess = false;
    @observable openSignOutFail = false;

    @action reset() {
        this.openSignInSuccess = false;
        this.openSignInFail = false;

        this.openSignUpSuccess = false;
        this.openSignUpTaken = false;
        this.openSignUpFail = false;
    }
}

export default SnackbarStore;