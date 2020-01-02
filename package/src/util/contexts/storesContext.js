import {createContext} from "react";
import {CommentStore} from "../../stores/CommentStore";
import {UserStore} from "../../stores/UserStore";
import {DialogStore} from "../../stores/DialogStore";
import {WebsiteStore} from "../../stores/WebsiteStore";

export const storesContext = createContext({
    commentStore: new CommentStore(),
    userStore: new UserStore(),
    dialogStore: new DialogStore(),
    websiteStore: new WebsiteStore()
});

export default storesContext;