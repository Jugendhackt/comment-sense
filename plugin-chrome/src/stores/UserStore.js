import {observable} from "mobx";
import {useContext} from "react";

class UserStore {
    @observable username = "";
    @observable password = "";
    @observable sid = "";
    @observable loggedIn = false;
};

export const UserStoreContext = useContext(new UserStore);

