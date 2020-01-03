import { observable, action } from "mobx";

export class CommentStore {
    @observable comments = [];

    @action handleComments(comments) {
        this.comments = comments;
    }

    @action reset() {
        this.comments = [];
    }
}