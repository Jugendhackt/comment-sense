import {observable, action} from "mobx"

export class UserStore {
    @observable username = "";
    @observable password = "";
    @observable email = "";
    @observable sid = "";
    @observable loggedIn = false;

    @action handleUsername(username) {
        this.username = username;
    }

    @action handlePassword(password) {
        this.password = password;
    }

    @action handleSid(sid) {
        this.sid = sid;
    }

    @action handleLoggedIn(loggedIn) {
        this.loggedIn = loggedIn;
    }

    @action reset() {
        this.username = "";
        this.password = "";
        this.email = "";
        this.sid = "";
        this.loggedIn = false;
    }
}