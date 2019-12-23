import React from "react";
import mainStore from "../store/mainStore.jsx";

export default class Fiyatlar extends React.Component {

    onUpgrade = () => {
        mainStore.setState(({fiyat}) => {
            return {fiyat: fiyat + 7000}
        })
    };
    onDowngrade = () => {
        mainStore.setState(({fiyat}) => {
            return {fiyat: fiyat - 7000}
        })
    };

    render() {

        return <div className="card">
            Fiyat: <button onClick={this.onUpgrade}>Daha Pahalı</button> <button onClick={this.onDowngrade}>Daha Ucuz</button>
        </div>
    }
}
