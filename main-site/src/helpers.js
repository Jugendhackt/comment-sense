import { ipAddress } from "./constants";
import { useContext } from "react";
import { UserStoreContext } from "./stores/UserStore";

const useSessionId = () => {
    const sessionId = document.cookie.match(new RegExp('(^| )sid=([^;]+)'));
    console.log(sessionId);
    if (sessionId)
        return (sessionId.length) ? sessionId[0].split("=")[1] : null;
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
    document.cookie = "sid=; expires Thu, 01 Jan 1970 00:00:01 GMT;";
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