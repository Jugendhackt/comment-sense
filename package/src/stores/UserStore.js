import { observable, action} from "mobx"
import {createContext} from "react";

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
}

export default UserStore;