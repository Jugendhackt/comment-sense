import {Routes} from "../routes";

const useSignIn = (data) => {
    return new Promise(resolve => {
        let status;
        if (data.username && data.password) {
            fetch(Routes.signIn(data))
                .then(res => {
                    status = res.status;
                    if (res.status === 200) {
                        return res.json();
                    }
                })
                .then(res => {
                    if (res.sid && status === 200) {
                        resolve(res.sid);
                    } else {
                        resolve(false);
                    }
                })
                .catch(e => {
                    resolve(false);
                })
        }
    });
};

export default useSignIn;