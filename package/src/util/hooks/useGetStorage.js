export const useGetStorage = (id) => {
    if (Array.isArray(id)) {
        let arr = [];
        const length = id.length;
        for (let i = 0; i < length; i++) {
            arr.push(localStorage.getItem(id[i]));
        }
        return arr;
    } else {
        return localStorage.getItem(id);
    }
};

export default useGetStorage;