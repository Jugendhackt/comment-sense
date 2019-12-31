import {ipAddress} from "../constants";

export const useLoggedIn = (sessionId) => {
    return new Promise(resolve => {
        if (sessionId !== null) {
            fetch(`${ipAddress}/api/checksid?sid='${sessionId}'`)
                .then(res => {
                    if (res.status === 410) {
                        resolve(false);
                    } else if (res.status === 200) {
                        resolve(true);
                    }
                })
        } else {
            resolve(false);
        }
    });
};

export default useLoggedIn;