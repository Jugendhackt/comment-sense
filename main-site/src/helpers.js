import React, { useEffect } from "react";

const useSessionId = () => {
    const sessionId = document.cookie.split(";").filter(c => c.trim().split("=")[0] === "sid");
    return (sessionId.length) ? sessionId[0].split("=")[1] : null;
};

export { useSessionId };