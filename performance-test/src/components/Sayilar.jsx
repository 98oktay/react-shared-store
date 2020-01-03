import React from "react";
import { SketchPicker } from 'react-color';
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
            <SketchPicker onChange={({hex})=>mainStore.setState({color:hex})} />
        </div>
    }
}
