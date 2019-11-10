import { ipAddress } from "./constants";

const useSessionId = () => {
    const sessionId = document.cookie.split(";").filter(c => c.trim().split("=")[0] === "sid");
    return (sessionId.length) ? sessionId[0].split("=")[1] : null;
};

const useLoggedIn = (sessionId) => {
    return new Promise(resolve => {
        console.log(sessionId);
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