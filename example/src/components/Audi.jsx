import React from "react";
import mainStore from "../store/mainStore.jsx";


export default class Audi extends React.Component {

    componentDidMount() {
        mainStore.register(this, "price")
    }

    onStoreUpdated = (state, prevState) => {
        console.log("changed", prevState)
    };

    render() {
        return <div className="card">
            <div> mainStore.register(this, "price")</div>
            Car Count: {mainStore.state.count}
            <br/>
            Car Price: {mainStore.state.price}
            <br/>
            <button onClick={() => mainStore.register(this)}>register all</button>
            <button onClick={() => mainStore.unregister(this)}>Unregister</button>
        </div>
    }
}
