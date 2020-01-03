import React from "react";
import mainStore from "../store/mainStore.jsx";


export default class AudiCount extends React.Component {

    componentDidMount() {
        mainStore.register(this, "count")
    }

    render() {
        return <div className="card">
            <div> mainStore.register(this, "count")</div>
            Audi Sayısı: {mainStore.state.count}
            <br/>
            Audi Fiyatları: {mainStore.state.price}
        </div>
    }
}
