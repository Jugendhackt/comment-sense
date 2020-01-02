const useSessionId = () => {
    const sessionId = document.cookie.match(new RegExp('(^| )sid=([^;]+)'));
    if (sessionId)
        return (sessionId.length) ? sessionId[0].split("=")[1] : null;
};

export default useSessionId;