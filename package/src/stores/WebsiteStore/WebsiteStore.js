import {action, observable} from "mobx";

export class WebsiteStore {
    @observable websites = [];

    @action reset() {
        this.websites = [];
    }
}

export default WebsiteStore;