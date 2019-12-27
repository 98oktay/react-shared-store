import React from "react";
import mainStore from "../store/mainStore.jsx";

export default class Fiyatlar extends React.Component {

    onUpgrade = () => {
        mainStore.setState(({price}) => {
            return {price: price + 7000}
        })
    };
    onDowngrade = () => {
        mainStore.setState(({price}) => {
            return {price: price - 7000}
        })
    };

    render() {

        return <div className="card">
            Price: <button onClick={this.onUpgrade}>Daha Pahalı</button> <button onClick={this.onDowngrade}>Daha Ucuz</button>
        </div>
    }
}
