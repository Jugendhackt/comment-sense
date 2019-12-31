import {createContext} from "react";
import {UserStore} from "../../stores/UserStore";
import {DialogStore} from "../../stores/DialogStore";
import {CommentStore} from "../../stores/CommentStore";

export const storesContext = createContext({
    userStore: new UserStore(),
    dialogStore: new DialogStore(),
    commentStore: new CommentStore()
});

export default storesContext;