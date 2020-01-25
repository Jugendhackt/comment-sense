import {Routes} from "../routes";

const useEmail = (sid) => {
    return new Promise(resolve => {
        let status;
        fetch(Routes.getUser(sid))
            .then(res => {
                status = res.status;
                if (res.status === 200) {
                    return res.json();
                }
            })
            .then(res => {
                if (res.email && status === 200) {
                    resolve(res.email);
                } else {
                    resolve(false);
                }
            })
            .catch(e => {
                resolve(false);
            })
    });
};

export default useEmail;