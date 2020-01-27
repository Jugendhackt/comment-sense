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
        return `${ipAddress}/api/user`;
    },
    getComments: (data) => {
        if (data.url && data.username) {
            return `${ipAddress}/api/comments?site=${data.url}&username=${data.username}`;
        } else if (data.url) {
            return `${ipAddress}/api/comments?site=${data.url}`;
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
        return `${ipAddress}/api/signout?sid=${sid}`;
    },
    signIn: data => {
        if (data.username && data.password) {
            return `${ipAddress}/api/signin?username=${data.username}&password=${data.password}`;
        } else {
            return null;
        }
    },
    signUp: () => {
        return `${ipAddress}/api/signup/`;
    },
    topComments: (data) => {
        if (data.count && data.username) {
            return `${ipAddress}/api/comments?count=${data.count}&username=${data.username}`;
        } else if (data.count) {
            return `${ipAddress}/api/comments?count=${data.count}`;
        } else {
            return null;
        }
    },
    topWebsites: count => {
        if (count) {
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