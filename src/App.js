import { useState, useEffect } from 'react';

import { GameState } from './utilities/gameState';
import Miner from './components/Miner';
import Header from './components/Header';
import Overlay from './components/Overlay';

import './App.css';

const App = () => {
  const [size, setSize] = useState(6);
  const [minePercentage, setMinePercentage] = useState(10);
  const [minesAmount, setMinesAmount] = useState(null);
  const [gameState, setGameState] = useState(GameState.Active);
  const [shouldShowOverlay, setShouldShowOverlay] = useState(true);
  const [field, setField] = useState(null);
  const [gameStarted, setGameStarted] = useState(null);
  const [isTimerTicking, setIsTimerTicking] = useState(false);
  const [triggerRestart, setTriggerRestart] = useState(0);

  const flagsAmount =
    field &&
    field.reduce(
      (res, row) => res + row.reduce((res, item) => res + +item.flag, 0),
      0
    );

  // calculate game status on each turn
  useEffect(() => {
    if (field) {
      if (
        !gameStarted &&
        field.some((row) => row.some(({ closed, flag }) => !closed || flag)) // some cell were touched
      ) {
        setGameStarted(Date.now());
      }
      const gameWon = field.every((row) =>
        row.every(({ mine, flag, closed }) => (mine ? flag || closed : !closed))
      );

      const gameLost = field.some((row) =>
        row.some(({ mine, closed }) => mine && !closed)
      );

      setGameState(
        gameWon ? GameState.Won : gameLost ? GameState.Lost : GameState.Active
      );
    }
  }, [field]);

  // stop timer when game ends
  useEffect(() => {
    if (gameState !== GameState.Active) {
      setIsTimerTicking(false);
    }
  }, [gameState]);

  const commonProps = {
    size,
    minePercentage,
    triggerRestart,
    gameState,
    setGameState,
  };
  const headerProps = {
    flagsAmount,
    minesAmount,
    gameStarted,
    isTimerTicking,
    setSize,
    setTriggerRestart,
    setMinePercentage,
  };
  const minerProps = {
    field,
    setField,
    setMinesAmount,
    setShouldShowOverlay,
    setGameStarted,
    setIsTimerTicking,
  };

  return (
    <div className="App">
      <Header {...headerProps} {...commonProps} />
      <Miner {...minerProps} {...commonProps} />
      {gameState !== GameState.Active && shouldShowOverlay && (
        <Overlay
          onClick={() => setShouldShowOverlay(false)}
          gameState={gameState}
        />
      )}
      <div className="App-createdBy">
        Created with React by Konstantin Modin © 2020{' '}
      </div>
    </div>
  );
};

export default App;
