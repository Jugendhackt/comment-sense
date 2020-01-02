import { observable, action } from "mobx";
import { createContext } from "react";

export class CommentStore {
    @observable comments = [];

    @action handleComments(comments) {
        this.comments = comments;
    }
}