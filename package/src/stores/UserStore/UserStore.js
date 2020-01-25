import {action, observable} from "mobx"

export class UserStore {
    @observable username = "";
    @observable password = "";
    @observable newPassword = "";
    @observable email = "";
    @observable sid = "";
    @observable loggedIn = false;

    @action signIn(data) {
        this.username = data.username;
        this.loggedIn = true;
        this.sid = data.sid;
    }

    @action reset() {
        this.username = "";
        this.password = "";
        this.email = "";
        this.sid = "";
        this.loggedIn = false;
        this.email = "";
        this.newPassword = "";
    }

    @action clearInput() {
        this.username = "";
        this.password = "";
        this.email = "";
        this.newPassword = "";
    }
}

export default UserStore;