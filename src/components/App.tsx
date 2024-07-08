import React, { useEffect, useState } from "react";
import SpinButton from "./buttons/SpinButton";
import "../styles/index.css";
import Machine from "./slot-machine/Machine";

const App: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    console.log("App mounted");

    async function loadAssets() {
      try {
        const response = await fetch("/assets/assets.json");
        const data = await response.json();
        console.log("Assets data:", data);

        const imageKeys = Object.keys(data.frames);
        const imageUrls = imageKeys.map((key) => `/assets/${key}`);
        console.log("Image URLs:", imageUrls);

        setImages(imageUrls);
      } catch (error) {
        console.error("Failed to load assets:", error);
      }
    }

    loadAssets();
  }, []);

  const handleSpinClick = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 2000);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Slot Machine</h1>
        <Machine images={images} isSpinning={isSpinning} />
        <SpinButton onClick={handleSpinClick} />
      </header>
    </div>
  );
};

export default App;
