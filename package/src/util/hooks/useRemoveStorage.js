export const useRemoveStorage = (id) => {
    if (Array.isArray(id)) {
        for (let i = 0; i < id.length; i++) {
            localStorage.removeItem(id[i]);
        }
    } else {
        localStorage.removeItem(id);
    }
};

export default useRemoveStorage;