import {Routes} from "../../routes";
import {useStorage} from "../index";

const useSignIn = async (username, password) => {
    try {
        if (username && password) {
            const response = await fetch(Routes.signIn(username, password));
            const json = await response.json();
            console.log(json.sid);
            if (json.sid) {
                useStorage.set(["username", "sid"], [username, json.sid]);
                return json.sid;
            } else {
                return false;
            }
        }
    } catch (e) {
        throw new Error(e.message);
    }
};

export default useSignIn;