import {Routes} from "../../routes";

const useSignUp = async (username, password, email) => {
    try {
        if (username && password) {
            let body;
            if (email) {
                body = JSON.stringify({username: username, password: password, email: email});
            } else {
                body = JSON.stringify({username: username, password: password});
            }
            const response = await fetch(Routes.signUp(), {method: "POST", body: body});
            return response.status === 200;
        }
    } catch (e) {
        throw new Error(e.message);
    }
};

export default useSignUp;