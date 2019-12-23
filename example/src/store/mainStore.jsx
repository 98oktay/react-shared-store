import SharedStore from "react-shared-store";

const mainStore = new SharedStore({
    count: 1,
    fiyat: 100000
});


mainStore.useStorage("mainStorage", {
    shareOnTabs: true
});

export default mainStore;
