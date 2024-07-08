import React, { useEffect, useState } from "react";
import { Stage } from "@pixi/react";
import { Texture, Assets } from "pixi.js";
import Reel from "./Reel";

interface MachineProps {
  isSpinning: boolean;
}

const Machine: React.FC<MachineProps> = ({ isSpinning }) => {
  const [textures, setTextures] = useState<Texture[]>([]);

  useEffect(() => {
    const loadTextures = async () => {
      const assets = await Assets.load("/assets/assets.json");
      const frames = assets.data.frames;
      const symbols = Object.keys(frames).filter((key) =>
        key.match(/(Bonus|Coin|High\d|Low\d|Wild)\.png/)
      );
      const loadedTextures = symbols.map((symbol) =>
        Texture.from(frames[symbol].texture)
      );
      setTextures(loadedTextures);
    };

    loadTextures();
  }, []);

  return (
    <Stage
      width={800}
      height={500}
      options={{ backgroundColor: 0x1099bb }}>
      {textures.length > 0 && (
        <>
          <Reel
            x={75}
            y={100}
            textures={textures}
            isSpinning={isSpinning}
          />
          <Reel
            x={325}
            y={100}
            textures={textures}
            isSpinning={isSpinning}
          />
          <Reel
            x={575}
            y={100}
            textures={textures}
            isSpinning={isSpinning}
          />
        </>
      )}
    </Stage>
  );
};

export default Machine;
