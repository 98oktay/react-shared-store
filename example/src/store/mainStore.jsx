import SharedStore from "../../../"; // from "react-shared-store";

const mainStore = new SharedStore({
    count: 1,
    price: 100000
});


mainStore.useStorage("mainStorage", {
    shareOnTabs: true
});

export default mainStore;
