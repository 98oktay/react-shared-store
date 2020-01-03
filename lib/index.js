import {useEffect, useState} from "react";

export default class SharedStore {
    constructor(initialState) {
        this.initialState = {...initialState};
        this.state = {...initialState};
        this.id = `${this.constructor.name}-${Date.now() + Math.random()}`;
        this.listeners = [];
        this.storage = false;
        this.ignoreStorage = false;
        this.storageSaveTimer = null;

        this.setState.bind(this);
        this.getState.bind(this);
        this.register.bind(this);
        this.useState.bind(this);
        this.unregister.bind(this);
        this.reset.bind(this);
        this.triggerChanges.bind(this);
        this.useStorage.bind(this);
    }

    setState(state) {
        const newState = typeof state === "function" ? state(this.state) : state;
        this.state = {...this.state, ...newState};
        const effectedKeys = Object.keys(newState);

        this.triggerChanges(effectedKeys)
    };

    getState() {
        return this.state;
    }

    reset() {
        return this.setState(this.initialState);
    }

    triggerChanges(effectedKeys) {
        const effectedComponents = this.listeners.filter(component => {
            if (component.storeRegisterKeys[this.id]) {
                let isEffected = false;
                component.storeRegisterKeys[this.id].map((key) => {
                    if (effectedKeys.indexOf(key) !== -1) {

                        isEffected = true;
                    }
                });
                return isEffected;
            } else {
                return true;
            }
        });
        effectedComponents.map(component => {
            component.forceUpdate && component.forceUpdate();
            component.onStoreUpdate && component.onStoreUpdate();
        });

        if (this.ignoreStorage) {
            return true;
        }
        if (this.storageSaveTimer) {
            clearTimeout(this.storageSaveTimer);
        }
        this.storageSaveTimer = setTimeout(() => this.saveToStorage(), this.storage.delay);
    }

    register(component, keys, callback) {

        if (!component.storeRegisterKeys) {
            component.storeRegisterKeys = {};
            component.onStoreUpdate = callback;
        }
        if (this.listeners.indexOf(component) === -1) {
            if (typeof keys === "string") {
                component.storeRegisterKeys[this.id] = [keys];
            } else {
                component.storeRegisterKeys [this.id] = keys;
            }
            this.listeners.push(component)
        } else {
            if (typeof keys === "string") {
                component.storeRegisterKeys[this.id] = [keys];
            } else {
                component.storeRegisterKeys [this.id] = keys;
            }
        }

    }

    unregister(component) {
        const index = this.listeners.indexOf(component);
        if (index !== -1) {
            delete this.listeners[index];
        }
    }

    useStorage(storageName, options = {}) {
        this.storage = {
            name: storageName,
            type: "local",
            delay: 200,
            ...options
        };

        this.loadFromStorage();

        if (this.storage.shareOnTabs) {
            this.listenStorageEvent();
        }
    }

    listenStorageEvent() {
        window.addEventListener("storage", (event) => {
            if (event.key === this.storage.name) {
                this.ignoreStorage = true;
                try {
                    const newState = JSON.parse(event.newValue);
                    this.setState(newState);
                } catch (e) {
                    console.warn(e)
                }
                this.ignoreStorage = false;
            }
        });
    }

    loadFromStorage() {
        if (this.storage.type === "local") {
            try {
                const state = JSON.parse(localStorage.getItem(this.storage.name));
                this.setState(state);
            } catch (e) {
                console.warn(e)
            }
        } else if (this.storage.type === "session") {
            try {
                const state = JSON.parse(sessionStorage.getItem(this.storage.name));
                this.setState(state);
            } catch (e) {
                console.warn(e)
            }
        }
    }

    saveToStorage() {
        if (!this.storage) {
            return false;
        }
        if (this.storage.type === "local") {
            try {
                localStorage.setItem(this.storage.name, JSON.stringify(this.state))
            } catch (e) {
                console.warn(e)
            }
        } else if (this.storage.type === "session") {
            try {
                sessionStorage.setItem(this.storage.name, JSON.stringify(this.state))
            } catch (e) {
                console.warn(e)
            }
        }
    }

    useState(propKey, component = {}, index = 0) {
        const [prop, setProp] = useState(this.state[propKey]);
        if (!component.instances) {
            component.instances = {};
        }
        if (!component.instances[index]) {
            component.instances[index] = {};
        }
        useEffect(() => {
            this.register(component.instances[index], propKey, () => setProp(this.state[propKey]));
            return () => {
                this.unregister(component.instances[index])
            }
        });
        const setStateProp = value => {
            this.setState({[propKey]: value});
        };
        return [prop, setStateProp];
    }
}
