import { ipAddress } from "./constants";

const useSessionId = () => {
    const sessionId = localStorage.getItem("sid");
    return sessionId;
};

const useLoggedIn = (sessionId) => {
    return new Promise(resolve => {
        fetch(`${ipAddress}/api/checksid?sid='${sessionId}'`)
            .then(res => {
                if (res.status === 410) {
                    resolve(false);
                } else if (res.status === 200) {
                    resolve(true);
                }
            })
    });
};

const removeSessionId = () => {
    localStorage.removeItem("sid");
};

const saveUsername = (username) => {
    const storage = localStorage;
    storage.setItem("username", username);
};

const getUsername = () => {
    const storage = localStorage;
    return storage.getItem("username");
};

export {
    useSessionId,
    useLoggedIn,
    saveUsername,
    getUsername,
    removeSessionId
};