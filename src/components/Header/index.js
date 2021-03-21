import React from "react";
import "./index.css";

const Header = (props) => {
  const {
    size,
    setSize,
    minePercentage,
    setMinePercentage,
    minesAmount,
    triggerRestart,
    setTriggerRestart,
    setGameOverMessage,
    flagsAmount,
    gameWon,
  } = props;

  const newGameHandler = () => {
    setTriggerRestart(triggerRestart + 1);
  };

  const setSizeHandler = (e) => {
    setSize(+e.target.value);
    setGameOverMessage("");
  };

  const setMinePercentageHandler = (e) => {
    setMinePercentage(+e.target.value);
    setGameOverMessage("");
  };

  return (
    <div className="Header">
      <h1>React-mine</h1>
      <div className="App-control">
        <button onClick={newGameHandler}>New Game</button>
      </div>
      <div className="App-control">
        <label>Field size</label>
        <input
          type="range"
          min={5}
          max={17}
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
      <div>Mines to go : {minesAmount - flagsAmount}</div>
    </div>
  );
};

export default Header;
