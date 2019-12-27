import {observable} from "mobx";
import {createContext} from "react";

class CommentStore {
    @observable comments = [];
}

const CommentStoreContext = createContext(new CommentStore());
export default CommentStoreContext;
