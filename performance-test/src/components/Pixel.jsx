import React from "react";
import mainStore from "../store/mainStore.jsx";

const Pixel = ({unique}) => {
    const [color] = mainStore.useState("color", Pixel, unique);

    return <div className="pixel" style={{backgroundColor: color}}/>
};

export default Pixel
