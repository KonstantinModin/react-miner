import { useEffect, useState } from 'react';
import { gameStateMessages, GameState } from '../../utilities/gameState';
import './index.css';

const Header = (props) => {
  const {
    size,
    setSize,
    minePercentage,
    setMinePercentage,
    minesAmount,
    triggerRestart,
    setTriggerRestart,
    flagsAmount,
    gameState,
    gameStarted,
    isTimerTicking,
  } = props;

  const [timeToShow, setTimeToShow] = useState(0);

  // update game time
  useEffect(() => {
    const id = setTimeout(() => {
      if (gameStarted && isTimerTicking) {
        const timePassed = Date.now() - gameStarted;
        setTimeToShow((timePassed / 1000) | 0);
      }
    }, 1000);
    return () => clearTimeout(id);
  }, [isTimerTicking, gameStarted, timeToShow]);

  // clear game time on the beginning of round
  useEffect(() => {
    if (!gameStarted) {
      setTimeToShow(0);
    }
  }, [gameStarted]);

  const newGameHandler = () => {
    setTriggerRestart(triggerRestart + 1);
  };

  const setSizeHandler = (e) => {
    setSize(+e.target.value);
  };

  const setMinePercentageHandler = (e) => {
    setMinePercentage(+e.target.value);
  };

  const renderGameState = () => {
    const { label, color } = gameStateMessages[gameState] || {};
    if (!label) return null;

    return (
      <div style={{ color }}>
        <strong>{label}</strong>
      </div>
    );
  };

  const renderRealPercentage = () => {
    return (
      <div>
        Real mines percentage : {((minesAmount / size / size) * 100).toFixed(2)}{' '}
        %
      </div>
    );
  };

  const renderMinesToGo = () => {
    return (
      gameState === GameState.Active && (
        <div>Mines to go : {minesAmount - flagsAmount}</div>
      )
    );
  };

  const renderTime = () => {
    return <div>Time : {gameStarted ? timeToShow : 0} sec</div>;
  };

  const calculatedFieldSize = ((window.innerWidth - 40) / 34) | 0;
  const maxFieldSize = Math.min(calculatedFieldSize, 20);

  return (
    <div className="Header">
      <div className="Header-topRow">
        <h1>React-mine</h1>
        <div className="Header-info">
          {renderRealPercentage()}
          {renderMinesToGo()}
          {renderGameState()}
          {renderTime()}
        </div>
      </div>
      <div className="Header-topRow">
        <div className="App-control">
          <button onClick={newGameHandler}>New Game</button>
        </div>
        <div className="App-control">
          <label>Field size</label>
          <input
            type="range"
            min={5}
            max={maxFieldSize}
            value={size}
            onChange={setSizeHandler}
          />
          <span>{size}</span>
        </div>
        <div className="App-control">
          <label>Mines percentage</label>
          <input
            type="range"
            min={10}
            max={30}
            value={minePercentage}
            onChange={setMinePercentageHandler}
          />
          <span>{minePercentage}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
