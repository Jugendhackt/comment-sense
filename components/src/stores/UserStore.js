import {observable} from "mobx";
import {createContext} from "react";

class UserStore {
    @observable username = "";
    @observable password = "";
    @observable sid = "";
    @observable loggedIn = false;
    @observable title = "";
    @observable comment = "";
}
const UserStoreContext = createContext(new UserStore());
export default UserStoreContext;

