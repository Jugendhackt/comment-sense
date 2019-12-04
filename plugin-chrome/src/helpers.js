
/*global chrome*/
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
    const item = localStorage.getItem(id);
    return item;
};

const removeStorage = (id) => {
    localStorage.removeItem(id);
};

const restoreUserStore = (userStore) => {
    userStore.username = "";
    userStore.password = "";
    userStore.email = "";
    userStore.sid = "";
    userStore.loggedIn = false;
};

const getCurrentTab = () => {
    return new Promise ((resolve) => {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
            const url = tabs[0].url;
            resolve(url);
        });
    });
};

export {
    setStorage,
    getStorage,
    removeStorage,
    useLoggedIn,
    restoreUserStore,
    getCurrentTab
};