/*global chrome*/
import {ipAddress} from "./constants";

export const useLoggedIn = (sessionId) => {
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

export const setStorage = (id, value) => {
    if (Array.isArray(id) && Array.isArray(value)) {
        for (let i = 0; i < id.length; i++) {
            localStorage.setItem(id[i], value[i]);
        }
    } else {
        localStorage.setItem(id, value);
    }
};

export const getStorage = (id) => {
    if (Array.isArray(id)) {
        let arr = [];
        const length = id.length;
        for (let i = 0; i < length; i++) {
            arr.push(localStorage.getItem(id[i]));
        }
        return arr;
    } else {
        return localStorage.getItem(id);
    }
};

export const removeStorage = (id) => {
    localStorage.removeItem(id);
};

export const restoreUserStore = (userStore) => {
    userStore.username = "";
    userStore.password = "";
    userStore.email = "";
    userStore.sid = "";
    userStore.loggedIn = false;
};

export const getCurrentTab = async () => {
    return new Promise((resolve) => {
        chrome.tabs.query({active: true}, (tabs) => {
            resolve(tabs[0].url);
        });
    });
};

export const getCommentsRoute = (url) => {
    if (url) {
        return `${ipAddress}/api/comments?site='${url}'`;
    } else {
        return null;
    }
};

export const getSignUpRoute = () => {
    return `${ipAddress}/api/signup/`;
};

export const getSignInRoute = (data) => {
    if (data.username && data.password) {
        return `${ipAddress}/api/signin?name='${data.username}'&password='${data.password}'`;
    } else {
        return null;
    }
};

export const postCommentRoute = () => {
    return `${ipAddress}/api/comments/`;
};
