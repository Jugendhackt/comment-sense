import {action, observable} from "mobx";

export class CommentStore {
    @observable comments = [];

    @action handleComments(comments) {
        this.comments = comments;
    }

    @action reset() {
        this.comments = [];
    }
}

export default CommentStore;