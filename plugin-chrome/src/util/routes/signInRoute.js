import {ipAddress} from "../constants";

export const signInRoute = (data) => {
    if (data.username && data.password) {
        return `${ipAddress}/api/signin?username='${data.username}'&password='${data.password}'`;
    } else {
        return null;
    }
};

export default signInRoute;