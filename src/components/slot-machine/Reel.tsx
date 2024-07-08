import React, { useEffect, useState, useRef } from "react";
import { Container, Sprite, useTick } from "@pixi/react";
import { Texture } from "pixi.js";

interface ReelProps {
  x: number;
  y: number;
  textures: Texture[];
  isSpinning: boolean;
}

const Reel: React.FC<ReelProps> = ({
  x,
  y,
  textures,
  isSpinning,
}) => {
  const [symbols, setSymbols] = useState<number[]>([0, 1, 2]);
  const containerRef = useRef<any>(null);
  const velocityRef = useRef(0);

  useEffect(() => {
    if (isSpinning) {
      velocityRef.current = 50;
    } else {
      velocityRef.current = 0;
      setSymbols((prevSymbols) =>
        prevSymbols.map(() =>
          Math.floor(Math.random() * textures.length)
        )
      );
    }
  }, [isSpinning, textures.length]);

  useTick((delta: number) => {
    if (velocityRef.current > 0) {
      setSymbols((prevSymbols) =>
        prevSymbols.map(
          (symbol) =>
            (symbol + velocityRef.current * delta) % textures.length
        )
      );
    }
  }, isSpinning);

  return (
    <Container x={x} y={y} ref={containerRef}>
      {symbols.map((symbol, index) => (
        <Sprite
          key={index}
          texture={textures[symbol]}
          y={index * 150}
        />
      ))}
    </Container>
  );
};

export default Reel;
