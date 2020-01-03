import {ipAddress} from "../constants";

export const topWebsitesRoute = (count) => {
    if (count) {
        return `${ipAddress}/api/sites?count=${count}`;
    } else {
        return null;
    }
};

export default topWebsitesRoute;