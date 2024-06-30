import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

interface PixiSlotMachineProps {
  isSpinning: boolean;
}

const PixiSlotMachine: React.FC<PixiSlotMachineProps> = ({
  isSpinning,
}) => {
  const pixiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const app = new PIXI.Application();

    app.init({
      width: 800,
      height: 500,
      backgroundColor: 0x1099bb,
      antialias: true,
      backgroundAlpha: 0,
      resolution: 1,
      autoStart: true,
      resizeTo: window,
      sharedTicker: true,
    });

    pixiContainerRef.current?.appendChild(app.canvas);

    const loadAssets = async () => {
      await PIXI.Assets.load("public/assets/assets.json");
    };

    const symbols = ["Symbol1.png", "Symbol2.png", "Symbol3.png"];

    class Reel {
      container: PIXI.Container;
      symbols: PIXI.Sprite[];
      textures: PIXI.Texture[];
      spinning: boolean;
      velocity: number;

      constructor(x: number, y: number) {
        this.container = new PIXI.Container();
        this.container.x = x;
        this.container.y = y;
        app.stage.addChild(this.container);
        this.symbols = [];
        this.textures = symbols.map((symbol) =>
          PIXI.Texture.from(symbol)
        );
        this.createSymbols();
        this.spinning = false;
        this.velocity = 0;
      }

      createSymbols() {
        this.symbols = [];
        for (let i = 0; i < 3; i++) {
          const sprite = new PIXI.Sprite(
            this.textures[
              Math.floor(Math.random() * this.textures.length)
            ]
          );
          sprite.y = i * 150;
          this.container.addChild(sprite);
          this.symbols.push(sprite);
        }
      }

      spin() {
        this.spinning = true;
        this.velocity = 50;
      }

      update(delta: number) {
        if (this.spinning) {
          this.symbols.forEach((sprite) => {
            sprite.y += this.velocity * delta;
            if (sprite.y > 450) {
              sprite.y -= 450;
              sprite.texture =
                this.textures[
                  Math.floor(Math.random() * this.textures.length)
                ];
            }
          });
        }
      }

      stop() {
        this.spinning = false;
        this.symbols.forEach((sprite) => {
          const pos = sprite.y % 150;
          sprite.y -= pos;
        });
      }
    }

    const run = async () => {
      const reels: Reel[] = [];
      for (let i = 0; i < 3; i++) {
        const reel = new Reel(i * 250 + 75, 100);
        reels.push(reel);
      }

      //   app.ticker.add((delta) => {
      //     reels.forEach((reel) => reel.update(delta));
      //   });
    };

    const checkWin = (reels: Reel[]) => {
      const firstSymbol = reels[0].symbols[0].texture;
      if (
        reels.every((reel) => reel.symbols[0].texture === firstSymbol)
      ) {
        playWinAnimation();
      }
    };

    const playWinAnimation = () => {
      console.log("You win!");
    };

    (async () => {
      await loadAssets();
      await run();
    })();

    return () => {
      app.destroy(true, true);
    };
  }, []);

  useEffect(() => {
    if (isSpinning) {
      // Logic to start spinning
    }
  }, [isSpinning]);

  return <div ref={pixiContainerRef} />;
};

export default PixiSlotMachine;
