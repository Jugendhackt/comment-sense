import {observable} from "mobx";
import {useContext} from "react";

class CommentStore {
    @observable comments = [];
};

export const CommentStoreContext = useContext(new CommentStore);
