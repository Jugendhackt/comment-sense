import {action, observable} from "mobx"

export class UserStore {
    @observable username = "";
    @observable password = "";
    @observable repeatPassword = "";
    @observable newPassword = "";
    @observable email = "";
    @observable sid = "";
    @observable loggedIn = false;

    @action signIn(sid, username) {
        if (username && sid) {
            this.username = username;
            this.loggedIn = true;
            this.sid = sid;
        }
    }

    @action reset() {
        this.username = "";
        this.password = "";
        this.email = "";
        this.sid = "";
        this.loggedIn = false;
        this.email = "";
        this.newPassword = "";
        this.repeatPassword = "";
    }

    @action clearInput() {
        this.username = "";
        this.password = "";
        this.email = "";
        this.newPassword = "";
    }
}

export default UserStore;