import React from 'react';
import './App.css';
import Pixel from "./components/Pixel";
import Sayilar from "./components/Sayilar";
import mainStore from "./store/mainStore";


function App() {

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
                <Sayilar/>
                <button onClick={() => mainStore.reset()}>RESET</button>
            </header>
        </div>
    );
}

export default App;
