import React from 'react';
import './App.css';
import Audi from "./components/Audi";
import Fiyatlar from "./components/Fiyatlar";
import Sayilar from "./components/Sayilar";
import AudiCount from "./components/AudiCount";
import mainStore from "./store/mainStore";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Audi/>
                <AudiCount/>
                <Fiyatlar/>
                <Sayilar/>
                <button onClick={()=>mainStore.reset()}>RESET</button>
            </header>
        </div>
    );
}

export default App;
