import { ipAddress } from "./constants";

const useSessionId = () => {
    const sessionId = document.cookie.match(new RegExp('(^| )sid=([^;]+)'));
    return (sessionId.length) ? sessionId[0].split("=")[1] : null;
};

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

export { useSessionId, useLoggedIn };