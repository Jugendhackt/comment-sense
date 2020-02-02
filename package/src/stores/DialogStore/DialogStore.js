import {action, observable} from "mobx";

export class DialogStore {
    @observable openSignIn = false;
    @observable openSignUp = false;
    @observable openAccount = false;
    @observable anchorElAccount = null;
    @observable openDrawer = false;
    @observable openComment = false;
    @observable openChangeUser = false;

    @action setAccount(open, anchorEl) {
        this.openAccount = open;
        this.anchorElAccount = anchorEl;
    }

    @action closeSignIn() {
        this.openSignIn = false;
        this.openDrawer = false;
    }

    @action closeSignUp() {
        this.openSignUp = false;
        this.openDrawer = false;
    }

    @action reset() {
        this.openSignIn = false;
        this.openSignUp = false;
        this.openAccount = false;
        this.anchorElAccount = null;
        this.openDrawer = false;
        this.openComment = false;
        this.openChangeUser = false;
    }
}

export default DialogStore;