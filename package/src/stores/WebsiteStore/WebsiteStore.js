import {action, observable} from "mobx";

export class WebsiteStore {
    @observable websites = [];

    @action handleWebsites(websites) {
        this.websites = websites;
    }
}

export default WebsiteStore;