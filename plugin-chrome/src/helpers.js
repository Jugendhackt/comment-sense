import { ipAddress } from "./constants";

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

const setStorage = (id, data) => {
    localStorage.setItem(id, data);
};

const getStorage = (id) => {
    localStorage.getItem(id);
    return id;
};

const removeStorage = (id) => {
    localStorage.removeItem(id);
};

export {
    setStorage,
    getStorage,
    removeStorage,
    useLoggedIn
};