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