import {observable} from "mobx";

export class WebsiteStore {
    @observable websites = [];
}

export default WebsiteStore;