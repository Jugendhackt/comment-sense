import { observable } from "mobx";
import { createContext } from "react";

class CommentStore {
    @observable comments = [];
};

export const CommentStoreContext = createContext(new CommentStore);

