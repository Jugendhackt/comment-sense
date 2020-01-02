import {createContext} from "react";
import {CommentStore} from "../../stores/CommentStore";
import {UserStore} from "../../stores/UserStore";
import {DialogStore} from "../../stores/DialogStore";

export const storesContext = createContext({
    commentStore: new CommentStore(),
    userStore: new UserStore(),
    dialogStore: new DialogStore()
});

export default storesContext;