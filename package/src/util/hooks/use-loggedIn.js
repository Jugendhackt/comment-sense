import {ipAddress} from "../constants";

export const useLoggedIn = (sessionId) => {
    return new Promise(resolve => {
        console.log(sessionId);
        if (sessionId !== undefined && sessionId !== null) {
            fetch(`${ipAddress}/api/checksid?sid='${sessionId}'`)
                .then(res => {
                    if (res.status === 401) {
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