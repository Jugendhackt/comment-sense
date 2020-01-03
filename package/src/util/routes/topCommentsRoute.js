import {ipAddress} from "../constants";

export const topCommentsRoute = (count) => {
    if (count) {
        return `${ipAddress}/api/comments?count=${count}`;
    } else {
        return null;
    }
};

export default topCommentsRoute;