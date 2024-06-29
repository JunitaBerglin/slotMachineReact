import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

const PixiSlotMachine: React.FC = () => {
  const pixiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const app = new PIXI.Application({
      width: 800,
      height: 500,
      backgroundColor: 0x1099bb,
      antialias: true,
      transparent: false,
      resolution: 1,
    });

    pixiContainerRef.current?.appendChild(app.view);

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
          let sprite = new PIXI.Sprite(
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
        this.velocity = 50; // Speed of spinning
      }

      update(delta: number) {
        if (this.spinning) {
          this.symbols.forEach((sprite) => {
            sprite.y += this.velocity * delta;
            if (sprite.y > 450) {
              // Reset position when the symbol goes off screen
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
        // Additional logic to ensure symbols align properly
        this.symbols.forEach((sprite) => {
          const pos = sprite.y % 150;
          sprite.y -= pos;
        });
      }
    }

    const run = async () => {
      const reels: Reel[] = [];
      for (let i = 0; i < 3; i++) {
        let reel = new Reel(i * 250 + 75, 100);
        reels.push(reel);
      }

      document
        .getElementById("spinButton")
        ?.addEventListener("click", () => {
          reels.forEach((reel) => reel.spin());
          setTimeout(() => {
            reels.forEach((reel) => reel.stop());
            checkWin(reels);
          }, 2000);
        });

      app.ticker.add((delta) => {
        reels.forEach((reel) => reel.update(delta));
      });
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
      // Use WinsweepBox[00-25] sequence for win animation
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

  return <div ref={pixiContainerRef} />;
};

export default PixiSlotMachine;
