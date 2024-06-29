import React from "react";
import PixiSlotMachine from "./components/PixiSlotMachine";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Slot Machine</h1>
        <button id="spinButton">Spin</button>
        <PixiSlotMachine />
      </header>
    </div>
  );
};

export default App;
