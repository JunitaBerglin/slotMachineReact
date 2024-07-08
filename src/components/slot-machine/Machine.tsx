import React, { useEffect, useState } from "react";
import { Stage, AnimatedSprite } from "@pixi/react";
import Reel from "./Reel";
import { Assets } from "pixi.js";

interface MachineProps {
  isSpinning: boolean;
  images: string[];
}

const Machine: React.FC<MachineProps> = ({ isSpinning, images }) => {
  const [loadedImages, setLoadedImages] = useState<any[]>([]);

  useEffect(() => {
    const loadTextures = async () => {
      const textureArray: any[] = [];
      for (const image of images) {
        const texture = await Assets.load(image);
        textureArray.push(texture);
      }
      setLoadedImages(textureArray);
    };

    loadTextures();
  }, [images]);

  return (
    <Stage
      width={800}
      height={500}
      options={{ backgroundColor: 0x1099bb }}>
      {loadedImages.length > 0 && (
        <>
          {loadedImages.map((texture, index) => (
            <AnimatedSprite
              key={index}
              texture={texture}
              x={100 * index}
              y={100}
              isPlaying={true}
            />
          ))}
          <Reel
            x={75}
            y={100}
            isSpinning={isSpinning}
            images={loadedImages}
          />
          <Reel
            x={325}
            y={100}
            isSpinning={isSpinning}
            images={loadedImages}
          />
          <Reel
            x={575}
            y={100}
            isSpinning={isSpinning}
            images={loadedImages}
          />
        </>
      )}
    </Stage>
  );
};

export default Machine;
