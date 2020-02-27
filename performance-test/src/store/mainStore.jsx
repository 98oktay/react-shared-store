import SharedStore from "../../../"; // from "react-shared-store";

const mainStore = new SharedStore({
    count: 1,
    price: 100000,
    color: "#00ff00"
});

mainStore.useStorage("mainStorage", {
    shareOnTabs: true
});

export default mainStore;
