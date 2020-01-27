const useLoading = (loading, cb) => {
    if (!loading) {
        cb();
    }
};

export default useLoading;