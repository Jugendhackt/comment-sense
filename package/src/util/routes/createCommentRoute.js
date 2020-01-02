import {ipAddress} from "../constants";

export const createCommentRoute = () => {
    return `${ipAddress}/api/comments/`;
};

export default createCommentRoute;