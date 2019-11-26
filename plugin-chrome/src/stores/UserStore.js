import { observable } from "mobx";
import { createContext } from "react";

class UserStore {
    @observable username = "";
    @observable password = "";
    @observable sid = "";
    @observable loggedIn = false;
};

export const UserStoreContext = createContext(new UserStore);

