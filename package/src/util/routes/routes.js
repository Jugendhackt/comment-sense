import {ipAddress} from "../constants";

const Routes = {
    checkSid: sid => {
        if (sid) {
            return `${ipAddress}/api/checksid?sid=${sid}`;
        } else {
            return null;
        }
    },
    changeUser: () => {
        return `${ipAddress}/api/user/`;
    },
    getComments: (url, username) => {
        if (url && username) {
            return `${ipAddress}/api/comments?site=${url}&username=${username}`;
        } else if (url) {
            return `${ipAddress}/api/comments?site=${url}`;
        } else {
            return null;
        }
    },
    postComment: () => {
        return `${ipAddress}/api/comments/`;
    },
    getUser: sid => {
        if (sid) {
            return `${ipAddress}/api/user?sid=${sid}`;
        } else {
            return null;
        }
    },
    signOut: sid => {
        if (sid) {
            return `${ipAddress}/api/signout?sid=${sid}`;
        } else {
            return null;
        }
    },
    signIn: (username, password) => {
        if (username && password) {
            return `${ipAddress}/api/signin?username=${username}&password=${password}`;
        } else {
            return null;
        }
    },
    signUp: () => {
        return `${ipAddress}/api/signup/`;
    },
    topComments: (count, username) => {
        if (count && username) {
            return `${ipAddress}/api/comments?count=${count}&username=${username}`;
        } else if (count && typeof count === "number") {
            return `${ipAddress}/api/comments?count=${count}`;
        } else {
            return null;
        }
    },
    topWebsites: count => {
        if (count && typeof count === "number") {
            return `${ipAddress}/api/sites?count=${count}`;
        } else {
            return null;
        }
    },
    voteComment: () => {
        return `${ipAddress}/api/comments/`;
    }
};

export default Routes;