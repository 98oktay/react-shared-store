import React from 'react';
import './App.css';
import Pixel from "./components/Pixel";
import mainStore from "./store/mainStore";
import {SwatchesPicker} from "react-color";

function App() {

    const [color] = mainStore.useState("color", this);

    const pixels = [];
    for (let i = 0; i < 100; i++) {
        pixels.push(<Pixel key={i} unique={i}/>)
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="pixels">
                    {pixels}
                </div>
                <SwatchesPicker
                    color={ color }
                    onChange={({hex}) => mainStore.setState({color: hex})}/>
                <button onClick={() => mainStore.reset()}>RESET</button>
            </header>
        </div>
    );
}

export default App;
