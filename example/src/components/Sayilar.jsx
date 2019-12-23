import React from "react";
import mainStore from "../store/mainStore.jsx";

export default class Sayilar extends React.Component {

    onUpgrade = () => {
        mainStore.setState(({count}) => {
            return {count: count + 1}
        })
    };
    onDowngrade = () => {
        mainStore.setState(({count}) => {
            return {count: count - 1}
        })
    };

    render() {

        return <div className="card">
            Count: <button onClick={this.onUpgrade}>Daha Fazla</button> <button onClick={this.onDowngrade}>Daha Az</button>
        </div>
    }
}
