import {Routes} from "../../routes";

const useChangeUserData = async (username, password, newPassword, email) => {
    if (username && password && newPassword) {
        let body;
        if (email) {
            body = JSON.stringify({username: username, password: password, "new-password": newPassword, email: email});
        } else {
            body = JSON.stringify({username: username, password: password, "new-password": newPassword});
        }

        const response = await fetch(Routes.changeUser(), {method: "PATCH", body: body});
        return response.status === 200;
    }
};

export default useChangeUserData;