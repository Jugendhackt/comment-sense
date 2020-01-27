import {action, observable} from "mobx";

class LoadingStore {
    @observable loading = true;

    @action reset() {
        this.loading = true;
    }
}

export default LoadingStore;