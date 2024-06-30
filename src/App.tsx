import React, { useState } from "react";
import PixiSlotMachine from "./components/slot-machine/PixiSlotMachine";
import SpinButton from "./components/buttons/SpinButton";

const App: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpinClick = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 2000);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Slot Machine</h1>
        <SpinButton onClick={handleSpinClick} />
        <PixiSlotMachine isSpinning={isSpinning} />
      </header>
    </div>
  );
};

export default App;
