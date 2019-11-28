import { observable } from "mobx";
import { createContext } from "react";

class DialogStore {
    @observable openSignIn = false;
    @observable openSignUp = false;
    @observable openSignInSuccess = false;
    @observable openSignInFail = false;
    @observable openSignUpSuccess = false;
    @observable openSignUpFail = false;
    @observable openAccount = false;
    @observable anchorElAccount = null;
    @observable openDrawer = false;
};

export const DialogStoreContext = createContext(new DialogStore());