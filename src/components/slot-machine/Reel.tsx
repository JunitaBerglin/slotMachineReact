import React, { useEffect, useState, useRef } from "react";
import { Container, useTick, Sprite } from "@pixi/react";

interface ReelProps {
  x: number;
  y: number;
  isSpinning: boolean;
  images: any[];
}

const Reel: React.FC<ReelProps> = ({ x, y, isSpinning, images }) => {
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
          Math.floor(Math.random() * images.length)
        )
      );
    }
  }, [isSpinning, images.length]);

  useTick((delta: number) => {
    if (velocityRef.current > 0) {
      setSymbols((prevSymbols) =>
        prevSymbols.map(
          (symbol) =>
            (symbol + velocityRef.current * delta) % images.length
        )
      );
    }
  }, isSpinning);

  return (
    <Container x={x} y={y} ref={containerRef}>
      {symbols.map((symbolIndex, index) => (
        <Sprite
          key={index}
          texture={images[symbolIndex]}
          x={0}
          y={index * 100}
        />
      ))}
    </Container>
  );
};

export default Reel;
