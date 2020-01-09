import {action, observable} from "mobx";

export class DialogStore {
    @observable openSignIn = false;
    @observable openSignUp = false;
    @observable openSignInSuccess = false;
    @observable openSignInFail = false;
    @observable openSignUpSuccess = false;
    @observable openSignUpFail = false;
    @observable openAccount = false;
    @observable anchorElAccount = null;
    @observable openDrawer = false;

    @action handleSignIn(signIn) {
        this.openSignIn = signIn;
    }

    @action handleSignUp(signUp) {
        this.openSignUp = signUp;
    }

    @action handleSignInSuccess(signInSuccess) {
        this.openSignInSuccess = signInSuccess;
    }

    @action handleSignInFail(signInFail) {
        this.openSignInFail = signInFail;
    }

    @action handleSignUpSuccess(signUpSuccess) {
        this.openSignUpSuccess = signUpSuccess;
    }

    @action handleSignUpFail(signUpFail) {
        this.openSignUpFail = signUpFail;
    }

    @action handleAccount(account) {
        this.openAccount = account;
    }

    @action handleAnchorElAccount(anchorEl) {
        this.anchorElAccount = anchorEl;
    }

    @action handleDrawer(drawer) {
        this.openDrawer = drawer;
    }

    @action reset() {
        this.openSignIn = false;
        this.openSignUp = false;
        this.openSignInSuccess = false;
        this.openSignInFail = false;
        this.openSignUpSuccess = false;
        this.openSignUpFail = false;
        this.openAccount = false;
        this.anchorElAccount = null;
        this.openDrawer = false;
    }
}

export default DialogStore;