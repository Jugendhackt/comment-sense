import {Routes} from "../routes";

export const useLoggedIn = (sid) => {
    return new Promise(resolve => {
        if (sid !== undefined && sid !== null) {
            fetch(Routes.checkSid(sid))
                .then(res => {
                    if (res.status === 401) {
                        resolve(false);
                    } else if (res.status === 200) {
                        resolve(true);
                    }
                })
                .catch(e => {
                    resolve(false);
                })
        } else {
            resolve(false);
        }
    });
};

export default useLoggedIn;