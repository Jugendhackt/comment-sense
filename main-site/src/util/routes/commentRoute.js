import {ipAddress} from "../constants";

export const commentRoute = (url, username) => {
    console.log(username, "commentRoute");
    console.log(url, "commentRoute");
    if (url && username) {
        return `${ipAddress}/api/comments?site=${url}&username=${username}`;
    } else if (url) {
        return `${ipAddress}/api/comments?site=${url}`;
    } else {
        return null;
    }
};

export default commentRoute;