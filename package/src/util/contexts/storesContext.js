import {createContext} from "react";
import {CommentStore} from "../../stores/CommentStore/CommentStore";
import {UserStore} from "../../stores/UserStore/UserStore";
import {DialogStore} from "../../stores/DialogStore/DialogStore";
import {WebsiteStore} from "../../stores/WebsiteStore/WebsiteStore";
import {SnackbarStore} from "../../stores/SnackbarStore/SnackbarStore";
import LoadingStore from "../../stores/LoadingStore/LoadingStore";

export const storesContext = createContext({
    commentStore: new CommentStore(),
    userStore: new UserStore(),
    dialogStore: new DialogStore(),
    websiteStore: new WebsiteStore(),
    snackbarStore: new SnackbarStore(),
    loadingStore: new LoadingStore()
});

export default storesContext;