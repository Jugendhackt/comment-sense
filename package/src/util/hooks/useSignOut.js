import {Routes} from "../routes";

const useSignOut = (sid) => {
    return new Promise(resolve => {
        fetch(Routes.signOut(sid))
            .then(res => {
                if (res.status === 200) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(e => {
                resolve(false);
            })
    });
};

export default useSignOut;