import { observable} from "mobx"
import {createContext} from "react";

class UserStore {
    @observable username = "";
    @observable password = "";
    @observable email = "";
};

export const UserStoreContext = createContext(new UserStore());