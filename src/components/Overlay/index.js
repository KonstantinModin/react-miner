import { gameStateMessages } from '../../utilities/gameState';
import './index.css';

const Overlay = ({ gameState, onClick }) => {
  const { label, color } = gameStateMessages[gameState];

  return (
    <div
      className="Overlay"
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
