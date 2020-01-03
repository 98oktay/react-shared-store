import React from "react";
import mainStore from "../store/mainStore.jsx";

const Pixel = ({unique}) => {
    const [color] = mainStore.useState("color", Pixel, unique);
    return <div className="pixel" style={{backgroundColor: color}}/>
};

class Pixel2 extends React.PureComponent{

    componentDidMount() {
        mainStore.register(this, "color")
    }

    render() {
        return <div className="pixel" style={{backgroundColor: mainStore.state.color}}/>

    }
}

export default Pixel
