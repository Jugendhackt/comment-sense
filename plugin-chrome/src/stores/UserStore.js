import {action, observable} from "mobx";

export class UserStore {
    @observable username = "";
    @observable password = "";
    @observable sid = "";
    @observable loggedIn = false;
    @observable title = "";
    @observable comment = "";

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

    @action handleTitle(title) {
        this.title = title;
    }

    @action handleComment(comment) {
        this.comment = comment;
    }
}

