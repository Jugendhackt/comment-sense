import {createContext} from "react";
import {CommentStore} from "../../stores/CommentStore/CommentStore";
import {UserStore} from "../../stores/UserStore/UserStore";
import {DialogStore} from "../../stores/DialogStore/DialogStore";
import {WebsiteStore} from "../../stores/WebsiteStore/WebsiteStore";

export const storesContext = createContext({
    commentStore: new CommentStore(),
    userStore: new UserStore(),
    dialogStore: new DialogStore(),
    websiteStore: new WebsiteStore()
});

export default storesContext;