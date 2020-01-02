import { createContext } from "react";
import { observable } from "mobx";

class WebsiteStore {
    @observable websites = [];
};

export const WebsiteStoreContext = createContext(new WebsiteStore());

export default WebsiteStore;