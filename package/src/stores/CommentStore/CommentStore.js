import {action, observable} from "mobx";

export class CommentStore {
    @observable comments = [];

    @action reset() {
        this.comments = [];
    }
}

export default CommentStore;