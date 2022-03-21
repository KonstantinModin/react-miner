import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { GameState, gameStateMessages } from '../../utilities/gameState';
import './index.css';

const Overlay = ({ gameState, onClick }) => {
  const { label, color } = gameStateMessages[gameState];

  useEffect(() => {
    let id;
    let isAnimationShown = true;

    if (gameState === GameState.Won) {
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const id = setInterval(() => {
        if (!isAnimationShown) {
          return clearInterval(id);
        }

        const particleCount = randomInRange(25, 60) | 0;

        // since particles fall down, start a bit higher than random
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          })
        );
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          })
        );
      }, 250);
    }

    return () => {
      clearInterval(id);
      isAnimationShown = false;
    };
  }, []);

  return (
    <div
      className={`Overlay ${gameState}`}
      onClick={onClick}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="Overlay-contentWrapper" style={{ color }}>
        {label}
      </div>
    </div>
  );
};

export default Overlay;
