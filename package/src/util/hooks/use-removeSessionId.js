const removeSessionId = () => {
    document.cookie = "sid=; expires Thu, 01 Jan 1970 00:00:01 GMT;";
};
export default removeSessionId;