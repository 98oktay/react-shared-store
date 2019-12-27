import React from "react";
import mainStore from "../store/mainStore.jsx";


export default class Audi extends React.Component {

    componentDidMount() {
        mainStore.register(this, "fiyat")
    }



    render() {
        return <div className="card">
            <div> mainStore.register(this, "fiyat")</div>
            Audi Sayısı: {mainStore.state.count}
            <br/>
            Audi Fiyatları: {mainStore.state.price}
            <br/>
            <button onClick={()=>mainStore.register(this)}>register all</button>
            <button onClick={()=>mainStore.unregister(this)}>Unregister</button>
        </div>
    }
}
