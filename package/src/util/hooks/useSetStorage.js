export const useSetStorage = (id, value) => {
    if (Array.isArray(id) && Array.isArray(value)) {
        for (let i = 0; i < id.length; i++) {
            localStorage.setItem(id[i], value[i]);
        }
    } else {
        localStorage.setItem(id, value);
    }
};

export default useSetStorage;