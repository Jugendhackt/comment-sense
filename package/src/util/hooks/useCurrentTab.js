export const useCurrentTab = () => {
    return new Promise((resolve) => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            console.log(tabs[0].url, "getCurrentTab");
            resolve(tabs[0].url);
        })
    });
};
export default useCurrentTab;