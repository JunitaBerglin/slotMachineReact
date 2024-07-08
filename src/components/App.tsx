import React, { useState } from "react";
import Machine from "./slot-machine/Machine";
import SpinButton from "./buttons/SpinButton";
import "../styles/index.css";

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
        <div className="pixi-container">
          <Machine isSpinning={isSpinning} />
        </div>
      </header>
    </div>
  );
};

export default App;
